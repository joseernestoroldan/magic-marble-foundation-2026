import { groq } from "next-sanity";


export const chimpQuery = () => groq`*[_type == 'chimp'] | order(_createdAt desc){
    _id,
    publishedAt,
    title,
    chimpLink,
    description,
    _createdAt,
}`;

// export const allByTopQuery = () => {
//   const query = groq`*[_type == 'portalPaddyField' && topPick == true] | order(_publishedAt desc){
//   _id,
//   publishedAt,
//   title,
//   description,
//   "mainImage": mainImage.asset->url,
//   "crop": mainImage.crop,
//   "hotSpot": mainImage.hotspot,
//   }`;
//   return query;
// };

// export const allDataQuery = (myquery: string) => {
//   let query = groq`*[_type == '${myquery}'] | order(_createdAt desc){
//         _id,
//         publishedAt,
//         title,
//         chimpLink,
//         description,
//         characteristics,
//         youtubeLink,
//         "mainImage": mainImage.asset->url,
//         "secondImage": secondImage.asset->url,
//         "thirdImage": thirdImage.asset->url,
//         "fourthImage": fourthImage.asset->url,
//         "authorImage": authorImage.asset->url,
//         "crop": mainImage.crop,
//         "hotSpot": mainImage.hotspot,
//         author,
//         body,
//         contenido,
//         alt,
//         _createdAt,
//         name,
//         notificationSent,
//         notificationsSent
//   }`;

//   if (myquery === "chimp") {
//     query = groq`*[_type == '${myquery}'] | order(_createdAt desc){
//       _id,
//       publishedAt,
//       title,
//       chimpLink,
//       description,
//       "mainImage": mainImage.asset->url,
//       "crop": mainImage.crop,
//       "hotSpot": mainImage.hotSpot,
//       _createdAt,
//     }`;
//   }

//   return query;
// };

// export const oneQuery = (myquery: string) => {
//   const query = groq`*[_id == '${myquery}']{
//     _id,
//     publishedAt,
//     title,
//     description,
//     "mainImage": mainImage.asset->url,
//     "secondImage": secondImage.asset->url,
//     "thirdImage": thirdImage.asset->url,
//     "fourthImage": fourthImage.asset->url,
//     youtubeLink,
//     characteristics,
//     "authorImage": authorImage.asset->url,
//     "crop": mainImage.crop,
//     "hotSpotMain": mainImage.hotspot,
//     "hotSpotSecond": secondImage.hotspot,
//     "hotSpotThird": thirdImage.hotspot,
//     "hotSpotFourth": fourthImage.hotspot,
//     author,
//     contenido,
//     _createdAt,
// }`;
//   return query;
// };

// export const orderedDataQuery = (myquery: string, number: string) => {
//   const query = groq`*[_type == '${myquery}'] | order(publishedAt desc)[0..${number}]{
//     _id,
//     publishedAt,
//     title,
//     description,
//     "mainImage": mainImage.asset->url,
//     "authorImage": authorImage.asset->url,
//     author,
//     contenido,
//     _createdAt,
//     "hotSpotMain": mainImage.hotspot,
// }`;
//   return query;
// };

// export const allFiltterQuery = (myquery: string, parametro: string) => {
//   const query = groq`*[_type == '${myquery}' && category == '${parametro}'] | order(_createdAt asc){
//     _id,
//     name,
//     post,
//     body,
//     "mainImage": mainImage.asset->url,
//     email,
//     _createdAt,
//     category,
// }`;
//   return query;
// };
