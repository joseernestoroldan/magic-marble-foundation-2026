import { cache } from "react";
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

const getData: <T>(query: string, params?: Record<string, unknown>) => Promise<T[]> = async (query: string, params?: Record<string, unknown>) => {
  try {
    const data = await client.fetch(query, params);
    if (data.length === 0) return null;
    return data;
  } catch (error: unknown) {
    console.log(error)
    return null;
  }
};

const _getAllChimp = async () => {
  const query = chimpQuery();
  const data: chimpType[] | null = await getData(query);
  return data;
};

const _getAllDiaries = async () => {
  const query = diariesQuery();
  const data: diariesType[] | null = await getData(query);
  return data;
};

const _getAllProjects = async () => {
  const query = projectsQuery();
  const data: projectType[] | null = await getData(query);
  return data;
};

const _getBoard = async () => {
  const query = boardQuery();
  const data: boardType[] | null = await getData(query);
  return data;
} 

const _getAllGallery = async () => {
  const query = galleryQuery();
  const data: galleryType[] | null = await getData(query);
  return data;
}

const _getAllGrantees = async () => {
  const query = granteesQuery();
  const data: granteesType[] | null = await getData(query);
  return data;
}

const _getAllPaddyField = async () => {
  const query = portalPaddyFieldQuery();
  const data: portalPaddyFieldType[] | null = await getData(query);
  return data;
}

const _getAllRecipes = async () => {
  const query = recipesQuery();
  const data: recipesType[] | null = await getData(query);
  return data;
}

const _getGalleryById = async (id: string) => {
  const query = galleryByIdQuery();
  const data: galleryType[] | null = await getData(query, { id });
  return data;
}

const _getProjectById = async (id: string) => {
  const query = projectByIdQuery();
  const data: projectType[] | null = await getData(query, { id });
  return data;
}

const _getDiaryById = async (id: string) => {
  const query = diaryByIdQuery();
  const data: diariesType[] | null = await getData(query, { id });
  return data;
}

const _getPortalPaddyFieldById = async (id: string) => {
  const query = portalPaddyFieldByIdQuery();
  const data: portalPaddyFieldType[] | null = await getData(query, { id });
  return data;
}

const _getRecipeById = async (id: string) => {
  const query = recipeByIdQuery();
  const data: recipesType[] | null = await getData(query, { id });
  return data;
}

export const getAllChimp = cache(_getAllChimp);
export const getAllDiaries = cache(_getAllDiaries);
export const getAllProjects = cache(_getAllProjects);
export const getBoard = cache(_getBoard);
export const getAllGallery = cache(_getAllGallery);
export const getAllGrantees = cache(_getAllGrantees);
export const getAllPaddyField = cache(_getAllPaddyField);
export const getAllRecipes = cache(_getAllRecipes);
export const getGalleryById = cache(_getGalleryById);
export const getProjectById = cache(_getProjectById);
export const getDiaryById = cache(_getDiaryById);
export const getPortalPaddyFieldById = cache(_getPortalPaddyFieldById);
export const getRecipeById = cache(_getRecipeById);

export const getAllData = async (type: string) => {
  switch (type) {
    case "dairies":
      return getAllDiaries();
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
