import { groq } from "next-sanity";

export const chimpQuery =
  () => groq`*[_type == 'chimp'] | order(_createdAt desc){
    _id,
    publishedAt,
    title,
    chimpLink,
    description,
    _createdAt,
    "mainImage": mainImage.asset->url,
    "hotSpot": mainImage.hotspot,
    "crop": mainImage.crop
}`;

export const diariesQuery =
  () => groq`*[_type == 'dairies'] | order(_createdAt desc){
    _id,
    publishedAt,
    title,
    description,
    _createdAt,
    "mainImage": mainImage.asset->url,
    "authorImage": authorImage.asset->url,
    "crop": mainImage.crop,
    "hotSpotMain": mainImage.hotspot,
    "author": author,
    "contenido": contenido,
    notificationSent,
    notificationsSent
}`;

export const projectsQuery =
  () => groq`*[_type == 'projects'] | order(_createdAt desc){
    _id,
    publishedAt,
    title,
    description,
    _createdAt,
    "mainImage": mainImage.asset->url,
    "crop": mainImage.crop,
    "hotSpot": mainImage.hotspot,
    "contenido": contenido,
}`;

export const focusAreasQuery =
  () => groq`*[_type == 'focusAreas'] | order(_createdAt desc){
    _id,
    title,
    alt,
    body,
    _createdAt,
    "mainImage": mainImage.asset->url,
    "crop": mainImage.crop,
    "hotSpot": mainImage.hotspot,
    "contenido": contenido,
}`;

export const boardQuery =
  () => groq`*[_type == 'board'] | order(_createdAt asc){
    _id,
    name,
    post,
    email,
    body,
    category,
    _createdAt,
    "mainImage": mainImage.asset->url,
    "crop": mainImage.crop,
    "hotSpot": mainImage.hotspot
}`;

export const galleryQuery =
  () => groq`*[_type == 'gallery'] | order(_createdAt desc){
    _id,
    publishedAt,
    title,
    description,
    _createdAt,
    "mainImage": mainImage.asset->url,
    "crop": mainImage.crop,
    "hotSpot": mainImage.hotspot
}`;

export const galleryByIdQuery = (id: string) =>
  groq`*[_type == 'gallery' && _id == "${id}"]{
    _id,
    publishedAt,
    title,
    description,
    _createdAt,
    "mainImage": mainImage.asset->url,
    "crop": mainImage.crop,
    "hotSpot": mainImage.hotspot
}`;

export const granteesQuery =
  () => groq`*[_type == 'grantees'] | order(_createdAt desc){
    _id,
    name,
    _createdAt,
    "mainImage": mainImage.asset->url,
    "crop": mainImage.crop,
    "hotSpot": mainImage.hotspot
}`;

export const portalPaddyFieldQuery =
  () => groq`*[_type == 'portalPaddyField'] | order(_createdAt desc){
    _id,
    title,
    description,
    youtubeLink,
    _createdAt,
    "mainImage": mainImage.asset->url,
    "crop": mainImage.crop,
    "hotSpot": mainImage.hotspot,
    "secondImage": secondImage.asset->url,
    "cropSecond": secondImage.crop,
    "hotSpotSecond": secondImage.hotspot,
    "thirdImage": thirdImage.asset->url,
    "cropThird": thirdImage.crop,
    "hotSpotThird": thirdImage.hotspot,
    "fourthImage": fourthImage.asset->url,
    "cropFourth": fourthImage.crop,
    "hotSpotFourth": fourthImage.hotspot,
    "contenido": contenido,
    topPick
}`;

export const recipesQuery =
  () => groq`*[_type == 'recipes'] | order(_createdAt desc){
    _id,
    title,
    description,
    youtubeLink,
    _createdAt,
    "mainImage": mainImage.asset->url,
    "crop": mainImage.crop,
    "hotSpot": mainImage.hotspot,
    "secondImage": secondImage.asset->url,
    "cropSecond": secondImage.crop,
    "hotSpotSecond": secondImage.hotspot,
    "thirdImage": thirdImage.asset->url,
    "cropThird": thirdImage.crop,
    "hotSpotThird": thirdImage.hotspot,
    "fourthImage": fourthImage.asset->url,
    "cropFourth": fourthImage.crop,
    "hotSpotFourth": fourthImage.hotspot,
    "contenido": contenido
}`;

export const projectByIdQuery = (id: string) => groq`*[_type == 'projects' && _id == "${id}"] | order(_createdAt desc){
  _id,
  title,
  description,
  _createdAt,
  "mainImage": mainImage.asset->url,
  "crop": mainImage.crop,
  "hotSpot": mainImage.hotspot,
  "contenido": contenido,
}`;

export const diaryByIdQuery = (id: string) => groq`*[_type == 'dairies' && _id == "${id}"] | order(_createdAt desc){
  _id,
  title,
  description,
  _createdAt,
  "mainImage": mainImage.asset->url,
  "crop": mainImage.crop,
  "hotSpot": mainImage.hotspot,
  "contenido": contenido,
  "author": author,
  "authorImage": authorImage.asset->url,
  "authorImageCrop": authorImage.crop,
  "authorImageHotSpot": authorImage.hotspot,
  "notificationSent": notificationSent,
  "notificationsSent": notificationsSent
}`;

export const portalPaddyFieldByIdQuery = (id: string) => groq`*[_type == 'portalPaddyField' && _id == "${id}"] | order(_createdAt desc){
  _id,
  title,
  description,
  youtubeLink,
  _createdAt,
  "mainImage": mainImage.asset->url,
  "crop": mainImage.crop,
  "hotSpot": mainImage.hotspot,
  "secondImage": secondImage.asset->url,
  "cropSecond": secondImage.crop,
  "hotSpotSecond": secondImage.hotspot,
  "thirdImage": thirdImage.asset->url,
  "cropThird": thirdImage.crop,
  "hotSpotThird": thirdImage.hotspot,
  "fourthImage": fourthImage.asset->url,
  "cropFourth": fourthImage.crop,
  "hotSpotFourth": fourthImage.hotspot,
  "contenido": contenido,
  topPick
}`;

export const recipeByIdQuery = (id: string) => groq`*[_type == 'recipes' && _id == "${id}"] | order(_createdAt desc){
  _id,
  title,
  description,
  youtubeLink,
  _createdAt,
  "mainImage": mainImage.asset->url,
  "crop": mainImage.crop,
  "hotSpot": mainImage.hotspot,
  "secondImage": secondImage.asset->url,
  "cropSecond": secondImage.crop,
  "hotSpotSecond": secondImage.hotspot,
  "thirdImage": thirdImage.asset->url,
  "cropThird": thirdImage.crop,
  "hotSpotThird": thirdImage.hotspot,
  "fourthImage": fourthImage.asset->url,
  "cropFourth": fourthImage.crop,
  "hotSpotFourth": fourthImage.hotspot,
  "contenido": contenido
}`;
