"use client";

import { loadStudio } from "@/lib/book/store";

/** POST to one of the AI routes, with the studio's access code when one is set. */
export async function aiPost<T>(url: string, body: unknown): Promise<T> {
  const studio = await loadStudio();
  const r = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", ...(studio.accessCode ? { "x-studio-code": studio.accessCode } : {}) },
    body: JSON.stringify(body),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error ?? "Er ging iets mis.");
  return data as T;
}
