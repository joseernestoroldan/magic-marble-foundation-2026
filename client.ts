import { createClient } from "next-sanity";
import { boardType, chimpType, diariesType, focusAreasType, projectType } from "./clientTypes";
import { boardQuery, chimpQuery, diariesQuery, diaryByIdQuery, focusAreasQuery, projectByIdQuery, projectsQuery } from "./utils/groqQueries";

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

export const getFocusAreas = async () => {
  const query = focusAreasQuery();
  const data: focusAreasType[] | null = await getData(query);
  return data;
}

export const getBoard = async () => {
  const query = boardQuery();
  const data: boardType[] | null = await getData(query);
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