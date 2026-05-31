export type navLinkProps = {
  title: string;
  href: string
}

export type navDropdownProps = {
  title: string;
  menu: navLinkProps[];
}

export type profilePopoverProps = {
  name: string | null;
};

export type VideoFrameProps = {
  src: string;
};

export type ContainerProps = {
  children: React.ReactNode;
};

export type QueryType = {
  youtubeLink: string | null;
  thirdImage: string | null;
  hotSpotMain: HotSpot | null;
  hotSpotSecond: HotSpot | null;
  hotSpotThird: HotSpot | null;
  hotSpotFourth: HotSpot | null;
  alt: string | null;
  publishedAt: string | null;
  description: string | null;
  contenido: Block[] | null;
  chimpLink: string | null;
  characteristics: string | null;
  secondImage: string | null;
  crop: Crop | null;
  body: string | null;
  notificationsSent: boolean | null;
  _id: string;
  mainImage: string | null;
  authorImage: string | null;
  author: string | null;
  _createdAt: string;
  name: string | null;
  notificationSent: boolean | null;
  title: string;
  fourthImage: string | null;
  instructions: Block[] | null;
  ingredients: Block[] | null;
};

export type Block = {
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



export type GoogleDriveFile = {
  mimeType: string;
  webViewLink: string;
  id: string;
  name: string;
  folderId: string;
  folderName: string;
  thumbnailLink: string;
};

export type GoogleDriveResponse = {
  data: GoogleDriveFile[];
  success: boolean;
};

export type GroupedFiles = {
  folderName: string;
  files: GoogleDriveFile[];
};
