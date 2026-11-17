"use client";

import { useEffect, useState } from "react";
import { photoUrl } from "@/lib/book/store";

/** Resolves a stored photo to an object URL (undefined while loading or missing). */
export function usePhotoUrl(id: string | undefined, kind: "full" | "preview" = "preview") {
  const [state, setState] = useState<{ key: string; url?: string }>({ key: "" });
  const key = id ? `${id}:${kind}` : "";
  useEffect(() => {
    if (!id) return;
    let alive = true;
    photoUrl(id, kind).then((url) => alive && setState({ key: `${id}:${kind}`, url }));
    return () => {
      alive = false;
    };
  }, [id, kind]);
  return state.key === key ? state.url : undefined;
}
