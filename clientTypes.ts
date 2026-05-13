export type chimpType = {
  _id: string;
  title: string | null;
  description: string | null;
  chimpLink: string;
  _createdAt: string;
  publishedAt: string;
};

export type diariesType = {
  _id: string;
  title: string;
  description: string;
  _createdAt: string;
  publishedAt: string;
  mainImage: string | null;
  authorImage: string | null;
  author: string | null;
  contenido: Block[] | null;
  hotSpotMain: HotSpot | null;
  crop: Crop | null;
};

export type projectsType = {
  _id: string;
  _createdAt: string;
  contenido: Block[] | null;
  description: string | null;
  hotSpot: HotSpot | null;
  mainImage: string | null;
  publishedAt: string | null;
  title: string;
  crop: Crop | null;
};

type Block = {
  _key: string;
  _type: string;
  children: Children;
  markDefs: MarkDef[];
  style: Style;
  listItem: string | null;
  level: number;
};

type MarkDef = {
  _key: string;
  _type: string;
  href: string;
};

type Crop = {
  top: number;
  left: number;
  bottom: number;
  right: number;
  _type: string;
};

export type HotSpot = {
  width: number;
  height: number;
  x: number;
  y: number;
  _type: string;
};

type Style = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal" | "blockquote";

type Children = Child[];

type Child = {
  _key: string;
  _type: string;
  marks: string[];
  text: string;
};
