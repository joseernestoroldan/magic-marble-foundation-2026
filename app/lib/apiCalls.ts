import { GoogleDriveResponse } from "@/types/types";

export const fetchFiles = async (): Promise<GoogleDriveResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/documents`);
  if (!response.ok) throw new Error('Failed to fetch files');
  return response.json();
};
