export type chimpType = {
  _id: string;
  title: string | null;
  description: string | null;
  chimpLink: string;
  mainImage: string | null;
  hotSpot: HotSpot | null;
  crop: Crop | null;
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
  notificationSent: boolean | null;
  notificationsSent: number | null;
};

export type projectType = {
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

export type focusAreasType = {
  _id: string;
  _createdAt: string;
  title: string;
  alt: string | null;
  body: string | null;
  mainImage: string | null;
  hotSpot: HotSpot | null;
  crop: Crop | null;
  contenido: Block[] | null;
};

export type boardType = {
  _id: string;
  _createdAt: string;
  name: string;
  post: string | null;
  email: string | null;
  body: string | null;
  category: string | null;
  mainImage: string | null;
  hotSpot: HotSpot | null;
  crop: Crop | null;
};

export type galleryType = {
  _id: string;
  _createdAt: string;
  title: string | null;
  description: string | null;
  mainImage: string | null;
  hotSpot: HotSpot | null;
  crop: Crop | null;
  publishedAt: string | null;
};

export type granteesType = {
  _id: string;
  _createdAt: string;
  name: string;
  mainImage: string | null;
  hotSpot: HotSpot | null;
  crop: Crop | null;
};

export type portalPaddyFieldType = {
  _id: string;
  _createdAt: string;
  title: string;
  description: string | null;
  youtubeLink: string | null;
  mainImage: string | null;
  hotSpot: HotSpot | null;
  crop: Crop | null;
  secondImage: string | null;
  hotSpotSecond: HotSpot | null;
  cropSecond: Crop | null;
  thirdImage: string | null;
  hotSpotThird: HotSpot | null;
  cropThird: Crop | null;
  fourthImage: string | null;
  hotSpotFourth: HotSpot | null;
  cropFourth: Crop | null;
  contenido: Block[] | null;
  topPick: boolean | null;
};

export type recipesType = {
  _id: string;
  _createdAt: string;
  title: string;
  description: string | null;
  youtubeLink: string | null;
  mainImage: string | null;
  hotSpot: HotSpot | null;
  crop: Crop | null;
  secondImage: string | null;
  hotSpotSecond: HotSpot | null;
  cropSecond: Crop | null;
  thirdImage: string | null;
  hotSpotThird: HotSpot | null;
  cropThird: Crop | null;
  fourthImage: string | null;
  hotSpotFourth: HotSpot | null;
  cropFourth: Crop | null;
  contenido: Block[] | null;
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

export type Crop = {
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
