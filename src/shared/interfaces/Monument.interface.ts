import type { GeoPoint, Timestamp } from "firebase/firestore";

export interface MonumentInterface {
  id: string;
  name: string
  year: number;
  civicNumber: number;
  street: string;
  postalCode: string;
  city: string;
  provinceState: string;
  country: string;
  geopoint: GeoPoint;
  geohash: string;
  resume: string;
  description: string;
  history: string;
  mainPhoto: string;
  photos?: string[];
  exclusivePhotos?: string[];
  likes: number;
  visits: number;
  distanceBetween?: number;
}

export interface MonumentVisitInterface{
  idMonument: string,
  idUser: string,
  username: string,
  review: string,
  reviewDate: Timestamp | null,
}

export type PartialMonumentInterface = Partial<MonumentInterface>;

