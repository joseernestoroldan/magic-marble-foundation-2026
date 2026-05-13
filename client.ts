import { createClient } from "next-sanity";
import { chimpType, diariesType, projectsType } from "./clientTypes";
import { chimpQuery, diariesQuery, projectsQuery } from "./utils/groqQueries";

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
  const data: projectsType[] | null = await getData(query);
  return data;
};

// export const getAllByTop = async () => {
//   const query = allByTopQuery()
//   const data: QueryType[] | null = await getData(query);
//   return data;
// };

// export const getAllData = async (myquery: string) => {
//   const query = allDataQuery(myquery)
//   const data: QueryType[] | null = await getData(query);
//   return data;
// };

// export const getOne = async (myquery: string) => {
//   const query = oneQuery(myquery)
//   const data: QueryType[] | null = await getData(query);
//   const [result] = data || [];
//   return data;
// };

// export const getOrderedData = async (myquery: string, number: string) => {
//   const query = orderedDataQuery(myquery, number)
//   const data: QueryType[] | null = await getData(query);
//   return data;
// };

// export const getAllFiltter = async (myquery: string, parametro: string) => {
//   const query = allFiltterQuery(myquery, parametro)
//   const data: QueryType[] | null = await getData(query);
//   return data;
// };

// // export const suscription = client
// //   .listen('*[_type == "dairies"]', { notificationSent: "notificationSent" })
// //   .subscribe((update) => {
// //     const coment = update.result?._id;
// //     console.log("resultado:", coment);
// //     console.log("Document update performed");
// //   });

// // export const UpdateSuscriptionStatus = async (
// //   documentId: string,
// //   numberNotifications: number
// // ) => {
// //   await client
// //     .patch(documentId)
// //     .set({ notificationSent: true, notificationsSent: numberNotifications + 1 })
// //     .commit();
// // };
