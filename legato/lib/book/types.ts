/**
 * Data model of a book. Geometry is always in percent of the open spread
 * (0–100 on both axes), so a design is independent of screen size and of the
 * print format. Real millimetres come in at render time via the format.
 */

export type Role = "fotograaf" | "klant";
export type BookKind = "bruiloft" | "reis";

export interface BookFormat {
  id: string;
  label: string;
  /** Trimmed size of one page in mm. A spread is 2 × pageW wide. */
  pageW: number;
  pageH: number;
}

export type TextRole =
  | "title"
  | "subtitle"
  | "kicker"
  | "body"
  | "quote"
  | "attribution"
  | "caption"
  | "script"
  | "list";

interface FrameBase {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ImageFrame extends FrameBase {
  kind: "image";
  photoId?: string;
  /** Focal point of the crop, 0–1. */
  fx: number;
  fy: number;
  bw?: boolean;
}

export interface TextFrame extends FrameBase {
  kind: "text";
  role: TextRole;
  text: string;
  align: "left" | "center" | "right";
  valign: "top" | "middle" | "bottom";
  columns?: number;
  dropCap?: boolean;
  /** Size multiplier on top of the type scale (1 = default). */
  scale?: number;
}

export interface BlockFrame extends FrameBase {
  kind: "block";
  tone: "tint" | "dark" | "accent";
}

export type Frame = ImageFrame | TextFrame | BlockFrame;

export interface Comment {
  id: string;
  role: Role;
  text: string;
  at: string;
  resolved?: boolean;
}

export type SpreadBackground = "paper" | "tint" | "dark";

export interface Spread {
  id: string;
  chapterId?: string;
  template: string;
  frames: Frame[];
  background: SpreadBackground;
  /** Locked spreads survive a new AI design run. */
  locked?: boolean;
  approved?: Partial<Record<Role, string>>;
  /** One line from the designer (AI or engine) on why this spread looks like this. */
  rationale?: string;
  comments: Comment[];
}

export interface Chapter {
  id: string;
  kind: string;
  title: string;
  subtitle?: string;
  /** Free text such as "14:30 · Landgoed" shown as the kicker on the opener. */
  moment?: string;
}

export type StoryKind =
  | "gelofte"
  | "speech"
  | "anekdote"
  | "quote"
  | "brief"
  | "tijdlijn"
  | "menu"
  | "playlist"
  | "opdracht"
  | "in-memoriam"
  | "verhaal";

export interface Story {
  id: string;
  chapterId?: string;
  kind: StoryKind;
  title: string;
  author: string;
  text: string;
  /** Who entered it — the couple can add stories in the client view. */
  by: Role;
}

export interface Photo {
  id: string;
  name: string;
  w: number;
  h: number;
  chapterId?: string;
  /** Favourite of the couple: must be in the book. */
  favorite?: boolean;
  /** Pick of the photographer: hero candidate. */
  hero?: boolean;
  takenAt: number;
  /** Generated demo image, not a real photograph. Blocks ordering. */
  placeholder?: boolean;
  /** Optional description (for the AI designer and as alt text). */
  note?: string;
}

export type Mood = "klassiek" | "modern" | "editorial" | "romantisch";

export interface StyleParams {
  mood: Mood;
  fontPair: string;
  palette: string;
  /** 1 = lots of white, 5 = rich pages. */
  density: number;
  /** 1 = almost only photographs, 5 = a real reading book. */
  textShare: number;
  /** 0 = none, 3 = many black-and-white spreads. */
  bwShare: number;
  margins: "ruim" | "normaal" | "krap";
  targetSpreads: number;
  tone: "ingetogen" | "warm" | "speels";
  /** Free instructions for the designer ("geen foto's over de vouw", …). */
  brief: string;
}

export interface Cover {
  material: string;
  color: string;
  title: string;
  subtitle: string;
  debossing: "blind" | "goud" | "zilver";
}

export interface OrderLine {
  accessoryId: string;
  qty: number;
}

export interface Signoff {
  role: Role;
  name: string;
  at: string;
}

export interface Project {
  id: string;
  kind: BookKind;
  title: string;
  names: string;
  date: string;
  place: string;
  photographer: string;
  formatId: string;
  style: StyleParams;
  cover: Cover;
  chapters: Chapter[];
  stories: Story[];
  photos: Photo[];
  spreads: Spread[];
  order: OrderLine[];
  signoffs: Signoff[];
  /** How the current design was made. */
  designedBy?: "claude" | "engine";
  createdAt: string;
  updatedAt: string;
}

export interface ProjectSummary {
  id: string;
  title: string;
  names: string;
  kind: BookKind;
  date: string;
  spreads: number;
  photos: number;
  updatedAt: string;
  status: "concept" | "ontwerp" | "proef" | "akkoord";
}

/** Studio (photographer portal) settings: white-label and pricing. */
export interface StudioSettings {
  name: string;
  tagline: string;
  accent: string;
  /** Retail price of the book per format, set by the photographer (incl. btw). */
  bookPrice: Record<string, number>;
  /** Extra price per spread above the included amount. */
  includedSpreads: number;
  extraSpreadPrice: number;
  accessoryPrice: Record<string, number>;
  /** Print production settings — confirm against the lab's templates. */
  bleedMm: number;
  safeMm: number;
  minPpi: number;
}

/** What a designer (Claude or the local engine) returns for one spread. */
export interface SpreadPlan {
  template: string;
  chapterId?: string;
  photoIds: string[];
  texts: Partial<Record<"title" | "subtitle" | "kicker" | "body" | "body2" | "quote" | "attribution" | "caption", string>>;
  background: SpreadBackground;
  bw?: boolean;
  rationale?: string;
}
