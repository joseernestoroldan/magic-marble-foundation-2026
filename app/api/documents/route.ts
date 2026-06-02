import { createSign } from "crypto";
import { NextResponse } from "next/server";

async function getGoogleAccessToken(): Promise<string> {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!clientEmail || !privateKey) {
    throw new Error("Missing Google service account credentials");
  }

  const scope = "https://www.googleapis.com/auth/drive.readonly";
  const now = Math.floor(Date.now() / 1000);
  const jwtHeader = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const jwtPayload = Buffer.from(
    JSON.stringify({
      iss: clientEmail,
      scope,
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  ).toString("base64url");

  const sign = createSign("RSA-SHA256");
  sign.update(`${jwtHeader}.${jwtPayload}`);
  const signature = sign.sign(privateKey, "base64url");

  const jwt = `${jwtHeader}.${jwtPayload}.${signature}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

async function driveApiFetch(accessToken: string, params: URLSearchParams) {
  const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.json();
}

export async function GET() {
  try {
    const accessToken = await getGoogleAccessToken();

    const folderParams = new URLSearchParams({
      q: "'1Vg74UBkx9k1yBcCLVs6oTqNstmbgsH5x' in parents",
      fields: "files(id, name, webViewLink, mimeType, parents, thumbnailLink)",
    });

    const folderData = await driveApiFetch(accessToken, folderParams);

    if (!folderData.files || folderData.files.length === 0) {
      return NextResponse.json({ error: "No folders found", success: false }, { status: 404 });
    }

    const folders = folderData.files;

    const filesWithFolderInfo = await Promise.all(
      folders.map(async (folder: { id: string; name: string }) => {
        const fileParams = new URLSearchParams({
          q: `'${folder.id}' in parents`,
          fields: "files(id, name, webViewLink, mimeType, thumbnailLink)",
        });

        const fileData = await driveApiFetch(accessToken, fileParams);

        if (!fileData.files || fileData.files.length === 0) {
          return [];
        }

        return fileData.files.map((file: Record<string, unknown>) => ({
          ...file,
          folderId: folder.id,
          folderName: folder.name,
        }));
      })
    );

    const allFiles = filesWithFolderInfo.flat();

    return NextResponse.json({ data: allFiles, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch documents. Please try again later.", success: false },
      { status: 500 }
    );
  }
}
