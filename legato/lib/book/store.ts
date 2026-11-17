"use client";

import { del, get, keys, set } from "idb-keyval";
import { DEFAULT_STUDIO } from "./catalog";
import { uid } from "./templates";
import type { Photo, Project, ProjectSummary, StudioSettings } from "./types";

/**
 * Local-first storage: everything lives in the browser's IndexedDB. This is
 * the one module to replace when projects move to a shared backend
 * (photographer and couple on different devices).
 */

const P = (id: string) => `project:${id}`;
const B = (id: string, kind: "full" | "preview") => `photo:${id}:${kind}`;

export async function listProjects(): Promise<ProjectSummary[]> {
  const all = (await keys()).filter((k): k is string => typeof k === "string" && k.startsWith("project:"));
  const projects = (await Promise.all(all.map((k) => get<Project>(k)))).filter(Boolean) as Project[];
  return projects
    .map((p) => ({
      id: p.id, title: p.title, names: p.names, kind: p.kind, date: p.date,
      spreads: p.spreads.length, photos: p.photos.length, updatedAt: p.updatedAt,
      status: statusOf(p),
    }))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function statusOf(p: Project): ProjectSummary["status"] {
  if (p.signoffs.some((s) => s.role === "klant") && p.signoffs.some((s) => s.role === "fotograaf")) return "akkoord";
  if (p.spreads.some((s) => s.approved?.klant || s.comments.length)) return "proef";
  if (p.spreads.length) return "ontwerp";
  return "concept";
}

export const loadProject = (id: string) => get<Project>(P(id));

export async function saveProject(p: Project): Promise<void> {
  await set(P(p.id), { ...p, updatedAt: new Date().toISOString() });
}

export async function deleteProject(id: string): Promise<void> {
  const p = await loadProject(id);
  if (p) await Promise.all(p.photos.flatMap((ph) => [del(B(ph.id, "full")), del(B(ph.id, "preview"))]));
  await del(P(id));
}

export async function loadStudio(): Promise<StudioSettings> {
  return { ...DEFAULT_STUDIO, ...((await get<StudioSettings>("studio")) ?? {}) };
}
export const saveStudio = (s: StudioSettings) => set("studio", s);

// ── Photo files ────────────────────────────────────────────────────────────

const urlCache = new Map<string, string>();

/** Object URL for a stored photo; cached for the lifetime of the page. */
export async function photoUrl(id: string, kind: "full" | "preview" = "preview"): Promise<string | undefined> {
  const key = B(id, kind);
  const hit = urlCache.get(key);
  if (hit) return hit;
  const blob = (await get<Blob>(key)) ?? (kind === "full" ? await get<Blob>(B(id, "preview")) : undefined);
  if (!blob) return undefined;
  const url = URL.createObjectURL(blob);
  urlCache.set(key, url);
  return url;
}

export async function storePhoto(id: string, full: Blob, preview: Blob): Promise<void> {
  await Promise.all([set(B(id, "full"), full), set(B(id, "preview"), preview)]);
}

export async function removePhoto(id: string): Promise<void> {
  await Promise.all([del(B(id, "full")), del(B(id, "preview"))]);
}

const PREVIEW_MAX = 1800;

async function toPreview(bitmap: ImageBitmap): Promise<Blob> {
  const k = Math.min(1, PREVIEW_MAX / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * k);
  canvas.height = Math.round(bitmap.height * k);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("preview"))), "image/jpeg", 0.86));
}

/** Imports image files: keeps the original untouched for print, adds a screen preview. */
export async function importFiles(files: File[], chapterId?: string, onProgress?: (done: number) => void): Promise<Photo[]> {
  const out: Photo[] = [];
  let done = 0;
  for (const file of files) {
    try {
      const bitmap = await createImageBitmap(file);
      const id = uid("p");
      await storePhoto(id, file, await toPreview(bitmap));
      out.push({ id, name: file.name, w: bitmap.width, h: bitmap.height, chapterId, takenAt: file.lastModified || Date.now() });
      bitmap.close();
    } catch {
      // Not an image the browser can decode (RAW, HEIC on some systems): skipped.
    }
    onProgress?.(++done);
  }
  return out;
}
