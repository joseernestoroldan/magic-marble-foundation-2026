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
