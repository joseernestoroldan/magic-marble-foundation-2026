import { createClient } from "next-sanity";
import { boardType, chimpType, diariesType, galleryType, granteesType, portalPaddyFieldType, projectType, recipesType } from "./clientTypes";
import { boardQuery, chimpQuery, diariesQuery, diaryByIdQuery, galleryByIdQuery, galleryQuery, granteesQuery, portalPaddyFieldByIdQuery, portalPaddyFieldQuery, projectByIdQuery, projectsQuery, recipeByIdQuery, recipesQuery } from "./utils/groqQueries";

const projectId = process.env.API_ID;
const dataset = "production"; // "production"
const apiVersion = "2023-05-03";
const token = process.env.API_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token,
});

const getData: <T>(query: string) => Promise<T[]> = async (query: string) => {
  try {
    const data = await client.fetch(query);
    if (data.length === 0) return null;
    return data;
  } catch (error: unknown) {
    console.log(error)
    return null;
  }
};

export const getAllChimp = async () => {
  const query = chimpQuery();
  const data: chimpType[] | null = await getData(query);
  return data;
};

export const getAllDiaries = async () => {
  const query = diariesQuery();
  const data: diariesType[] | null = await getData(query);
  return data;
};

export const getAllProjects = async () => {
  const query = projectsQuery();
  const data: projectType[] | null = await getData(query);
  return data;
};

export const getBoard = async () => {
  const query = boardQuery();
  const data: boardType[] | null = await getData(query);
  return data;
} 

export const getAllGallery = async () => {
  const query = galleryQuery();
  const data: galleryType[] | null = await getData(query);
  return data;
}

export const getAllGrantees = async () => {
  const query = granteesQuery();
  const data: granteesType[] | null = await getData(query);
  return data;
}

export const getAllPaddyField = async () => {
  const query = portalPaddyFieldQuery();
  const data: portalPaddyFieldType[] | null = await getData(query);
  return data;
}

export const getAllRecipes = async () => {
  const query = recipesQuery();
  const data: recipesType[] | null = await getData(query);
  return data;
}


export const getGalleryById = async (id: string) => {
  const query = galleryByIdQuery(id);
  const data: galleryType[] | null = await getData(query);
  return data;
}

export const getProjectById = async (id: string) => {
  const query = projectByIdQuery(id);
  const data: projectType[] | null = await getData(query);
  return data;
}

export const getDiaryById = async (id: string) => {
  const query = diaryByIdQuery(id);
  const data: diariesType[] | null = await getData(query);
  return data;
}

export const getPortalPaddyFieldById = async (id: string) => {
  const query = portalPaddyFieldByIdQuery(id);
  const data: portalPaddyFieldType[] | null = await getData(query);
  return data;
}

export const getRecipeById = async (id: string) => {
  const query = recipeByIdQuery(id);
  const data: recipesType[] | null = await getData(query);
  return data;
}

export const getAllData = async (type: string) => {
  switch (type) {
    case "dairies":
      return getAllDiaries();
    case "projects":
      return getAllProjects();
    case "gallery":
      return getAllGallery();
    case "grantees":
      return getAllGrantees();
    case "paddyfield":
      return getAllPaddyField();
    case "recipes":
      return getAllRecipes();
    case "chimp":
      return getAllChimp();
    default:
      return null;
  }
}

export const UpdateSuscriptionStatus = async (dairyId: string, count: number) => {
  try {
    await client.patch(dairyId).set({ notificationsSent: count }).commit({ token: process.env.API_TOKEN });
  } catch (error) {
    console.error("Error updating subscription status:", error);
  }
}
