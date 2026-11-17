"use client";

import { useCallback, useEffect, useReducer } from "react";
import { loadProject, saveProject } from "@/lib/book/store";
import type { Project } from "@/lib/book/types";

export type Update = (fn: (p: Project) => Project, opts?: { history?: boolean }) => void;

interface State {
  project: Project | null | undefined;
  past: Project[];
  future: Project[];
  saved: boolean;
}

type Action =
  | { type: "loaded"; project: Project | null }
  | { type: "update"; fn: (p: Project) => Project; history: boolean }
  | { type: "undo" }
  | { type: "redo" }
  | { type: "saved"; project: Project };

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "loaded":
      return { project: a.project, past: [], future: [], saved: true };
    case "update": {
      if (!s.project) return s;
      const next = a.fn(s.project);
      if (next === s.project) return s;
      return { project: next, past: a.history ? [...s.past.slice(-49), s.project] : s.past, future: a.history ? [] : s.future, saved: false };
    }
    case "undo": {
      const prev = s.past[s.past.length - 1];
      if (!s.project || !prev) return s;
      return { project: prev, past: s.past.slice(0, -1), future: [...s.future, s.project], saved: false };
    }
    case "redo": {
      const next = s.future[s.future.length - 1];
      if (!s.project || !next) return s;
      return { project: next, past: [...s.past, s.project], future: s.future.slice(0, -1), saved: false };
    }
    case "saved":
      return s.project === a.project ? { ...s, saved: true } : s;
  }
}

/** Loads a project, keeps an undo stack and saves a moment after each change. */
export function useProject(id: string) {
  const [state, dispatch] = useReducer(reducer, { project: undefined, past: [], future: [], saved: true });

  useEffect(() => {
    loadProject(id).then((p) => dispatch({ type: "loaded", project: p ?? null }));
  }, [id]);

  useEffect(() => {
    const project = state.project;
    if (!project || state.saved) return;
    const t = setTimeout(() => saveProject(project).then(() => dispatch({ type: "saved", project })), 500);
    return () => clearTimeout(t);
  }, [state.project, state.saved]);

  const update: Update = useCallback((fn, opts) => dispatch({ type: "update", fn, history: opts?.history !== false }), []);
  const undo = useCallback(() => dispatch({ type: "undo" }), []);
  const redo = useCallback(() => dispatch({ type: "redo" }), []);

  return { project: state.project, update, undo, redo, saved: state.saved, canUndo: state.past.length > 0, canRedo: state.future.length > 0 };
}
