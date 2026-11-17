"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import { loadProject, saveProject } from "@/lib/book/store";
import type { Project } from "@/lib/book/types";

export type Update = (fn: (p: Project) => Project, opts?: { history?: boolean }) => void;

interface State {
  project: Project | null | undefined;
  past: Project[];
  future: Project[];
  saved: boolean;
  /** Time of the last undo entry; quick successive edits share one entry. */
  stamp: number;
  error: string | null;
}

type Action =
  | { type: "loaded"; project: Project | null }
  | { type: "update"; fn: (p: Project) => Project; history: boolean; at: number }
  | { type: "undo" }
  | { type: "redo" }
  | { type: "saved"; project: Project }
  | { type: "failed"; message: string };

/** Typing a sentence or dragging a slider is one step back, not fifty. */
const COALESCE_MS = 900;

export function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "loaded":
      return { project: a.project, past: [], future: [], saved: true, stamp: 0, error: null };
    case "update": {
      if (!s.project) return s;
      const next = a.fn(s.project);
      if (next === s.project) return s;
      const push = a.history && a.at - s.stamp > COALESCE_MS;
      return { ...s, project: next, past: push ? [...s.past.slice(-99), s.project] : s.past, future: a.history ? [] : s.future, saved: false, stamp: a.history ? a.at : s.stamp };
    }
    case "undo": {
      const prev = s.past[s.past.length - 1];
      if (!s.project || !prev) return s;
      return { ...s, project: prev, past: s.past.slice(0, -1), future: [...s.future, s.project], saved: false, stamp: 0 };
    }
    case "redo": {
      const next = s.future[s.future.length - 1];
      if (!s.project || !next) return s;
      return { ...s, project: next, past: [...s.past, s.project], future: s.future.slice(0, -1), saved: false, stamp: 0 };
    }
    case "saved":
      return s.project === a.project ? { ...s, saved: true, error: null } : s;
    case "failed":
      return { ...s, error: a.message };
  }
}

export const initialState: State = { project: undefined, past: [], future: [], saved: true, stamp: 0, error: null };

/** Loads a project, keeps an undo stack and saves a moment after each change. */
export function useProject(id: string) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const pending = useRef<Project | null>(null);

  useEffect(() => {
    loadProject(id).then((p) => dispatch({ type: "loaded", project: p ?? null }));
  }, [id]);

  useEffect(() => {
    const project = state.project;
    if (!project || state.saved) return;
    pending.current = project;
    const save = () => {
      if (pending.current !== project) return;
      pending.current = null;
      saveProject(project)
        .then(() => dispatch({ type: "saved", project }))
        .catch(() => dispatch({ type: "failed", message: "Opslaan is mislukt. De opslagruimte van deze browser is mogelijk vol." }));
    };
    const t = setTimeout(save, 500);
    return () => clearTimeout(t);
  }, [state.project, state.saved]);

  // Leaving the page or the tab must not lose the last half second of work.
  useEffect(() => {
    const flush = () => {
      const project = pending.current;
      if (!project) return;
      pending.current = null;
      void saveProject(project).catch(() => {});
    };
    const onHide = () => document.visibilityState === "hidden" && flush();
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onHide);
      flush();
    };
  }, []);

  const update: Update = useCallback((fn, opts) => dispatch({ type: "update", fn, history: opts?.history !== false, at: Date.now() }), []);
  const undo = useCallback(() => dispatch({ type: "undo" }), []);
  const redo = useCallback(() => dispatch({ type: "redo" }), []);

  return { project: state.project, update, undo, redo, saved: state.saved, saveError: state.error, canUndo: state.past.length > 0, canRedo: state.future.length > 0 };
}
