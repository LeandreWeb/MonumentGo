import { db } from "@/firebase";
import { doc, GeoPoint, setDoc } from "firebase/firestore";
import { geohashForLocation } from "geofire-common";


export class SeedService {

  static async seedMonuments(drummondMonumentsDataJSON: any, montrealMonumentsDataJSON: any) {
    drummondMonumentsDataJSON.forEach((monument) => {
      let geoPoint = new GeoPoint(monument.latitude, monument.longitude);
      let geohash = geohashForLocation([monument.latitude, monument.longitude]);
      setDoc(doc(db, 'monuments', `${monument.id}`), {
        name: monument.name,
        year: monument.year,
        civicNumber: monument.civicNumber,
        street: monument.street,
        postalCode: monument.postalCode,
        city: monument.city,
        province: monument.province,
        country: monument.country,
        geoPoint: geoPoint,
        geohash: geohash,
        position: { geohash: geohash, geopoint: geoPoint},
        resume: monument.resume,
        description: monument.description,
        history: monument.history,
        mainPhoto: monument.mainPhoto,
        photos: monument.photos,
        exclusivePhotos: monument.exclusivePhotos,
        likes: monument.likes,
      });
    });
    montrealMonumentsDataJSON.forEach((monument) => {
      let geoPoint = new GeoPoint(monument.latitude, monument.longitude);
      let geohash = geohashForLocation([monument.latitude, monument.longitude]);
      setDoc(doc(db, 'monuments', `${monument.id}`), {
        name: monument.name,
        year: monument.year,
        civicNumber: monument.civicNumber,
        street: monument.street,
        postalCode: monument.postalCode,
        city: monument.city,
        province: monument.province,
        country: monument.country,
        geoPoint: geoPoint,
        geohash: geohash,
        position: { geohash: geohash, geopoint: geoPoint},
        resume: monument.resume,
        description: monument.description,
        history: monument.history,
        mainPhoto: monument.mainPhoto,
        photos: monument.photos,
        exclusivePhotos: monument.exclusivePhotos,
        likes: monument.likes,
      });
    });
  }

}

