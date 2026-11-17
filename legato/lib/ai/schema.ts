import { z } from "zod";

/**
 * What the AI designer returns per spread. Long texts are never retyped by
 * the model: it points at a story by id and the app sets the story's own
 * text, so vows and speeches reach the page exactly as written.
 */
export const SpreadDesign = z.object({
  template: z.string().describe("Template id from the catalog."),
  chapterId: z.string().describe("Chapter id, or an empty string for front and back matter."),
  photoIds: z.array(z.string()).describe("Photo ids in slot order; exactly as many as the template has photo slots."),
  storyId: z.string().describe("Story whose text fills the body slot, or an empty string."),
  storyId2: z.string().describe("Second story (right-hand vow on the 'geloften' template), or an empty string."),
  kicker: z.string(),
  title: z.string(),
  subtitle: z.string(),
  quote: z.string().describe("Pull quote, copied verbatim from a story. Empty if the template has no quote slot."),
  attribution: z.string(),
  caption: z.string(),
  background: z.enum(["paper", "tint", "dark"]),
  blackAndWhite: z.boolean(),
  rationale: z.string().describe("One short Dutch sentence for the photographer on why this spread looks like this."),
});

export const BookDesign = z.object({
  concept: z.string().describe("The design idea for this book in two Dutch sentences."),
  spreads: z.array(SpreadDesign),
});

export const SpreadOptions = z.object({
  options: z.array(SpreadDesign).describe("Up to three clearly different options."),
});

export const TextResult = z.object({
  options: z.array(z.string()).describe("One or more results, depending on the task."),
  note: z.string().describe("One short Dutch sentence on what was changed, or an empty string."),
});

export type SpreadDesignT = z.infer<typeof SpreadDesign>;
export type BookDesignT = z.infer<typeof BookDesign>;
