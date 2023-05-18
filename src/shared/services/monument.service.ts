import { db } from "@/firebase";
import { query, orderBy, where, doc, collection, getDoc, startAt, endAt, getDocs } from "firebase/firestore";
import { geohashQueryBounds, distanceBetween, type Geopoint } from "geofire-common";
import type { MonumentInterface } from "@/shared/interfaces";

export class MonumentService {

  static async getMonumentById(idMonument: string): Promise<MonumentInterface | null> {
    const docRef = doc(db, "monuments", idMonument);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const monumentData = docSnap.data() as MonumentInterface;
      return {
        ...monumentData,
        id: idMonument
      };
    } else {
      return null;
    }
  };

  static async getMonumentsByIds(monumentIds: string[]): Promise<MonumentInterface[]> {
    const monuments: MonumentInterface[] = [];

    for (const id of monumentIds) {
      const docRef = doc(db, "monuments", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const monument = docSnap.data();
        monument.id = id;
        monuments.push(monument as MonumentInterface);
      }
    }

    return monuments;
  }

  static async getNearMonuments(id: string, monumentLocation: Geopoint): Promise<MonumentInterface[]> {
    const radiusInM = 150; //distance en metres
    const bounds = geohashQueryBounds(monumentLocation, radiusInM);
    const matchingDocs: any = [];

    for (const b of bounds) {
      const q = query(
        collection(db, "monuments"),
        orderBy("geohash"),
        startAt(b[0]),
        endAt(b[1])
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (doc.id != id) {
          matchingDocs.push(doc);
        }
      });
    }

    const arrNearMonument: MonumentInterface[] = [];

    matchingDocs.forEach((monument) => {
      const newMonument: MonumentInterface = {
        id: monument.id,
        name: monument.data().name,
        year: monument.data().year,
        civicNumber: monument.data().year,
        street: monument.data().street,
        postalCode: monument.data().postalCode,
        city: monument.data().city,
        provinceState: monument.data().provinceState,
        country: monument.data().country,
        geopoint: monument.data().geoPoint,
        geohash: monument.data().geohash,
        resume: monument.data().resume,
        description: monument.data().description,
        history: monument.data().history,
        mainPhoto: monument.data().mainPhoto,
        photos: monument.data().photos,
        likes: monument.data().likes,
        visits: monument.data().visits,
      };

      arrNearMonument.push(newMonument);
    });

    return arrNearMonument;
  };

  static async getMonumentsWithinRadius(centerLatitude: number, centerLongitude: number, kmRange: number): Promise<any[]> {
    const monumentsWithinRadius = [] as MonumentInterface[];
    const radiusInM = kmRange * 1000;

    const bounds = geohashQueryBounds([centerLatitude, centerLongitude], radiusInM);
    const matchingDocs: any = [];
    for (const b of bounds) {
      const q = query(collection(db, "monuments"), orderBy("geohash"), startAt(b[0]), endAt(b[1]));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        matchingDocs.push(doc);
      });
    }

    matchingDocs.forEach((monument) => {
      const newMonument: MonumentInterface = {
        id: monument.id,
        name: monument.data().name,
        year: monument.data().year,
        civicNumber: monument.data().year,
        street: monument.data().street,
        postalCode: monument.data().postalCode,
        city: monument.data().city,
        provinceState: monument.data().provinceState,
        country: monument.data().country,
        geopoint: monument.data().geoPoint,
        geohash: monument.data().geohash,
        resume: monument.data().resume,
        description: monument.data().description,
        history: monument.data().history,
        mainPhoto: monument.data().mainPhoto,
        photos: monument.data().photos,
        exclusivePhotos: monument.data().exclusivePhotos,
        likes: monument.data().likes,
        visits: monument.data().visits,
      };
      const distanceInKm = distanceBetween(
        [newMonument.geopoint.latitude, newMonument.geopoint.longitude],
        [centerLatitude, centerLongitude]
      );
      newMonument.distanceBetween = distanceInKm;

      const distanceInM = distanceInKm * 1000;
      if (distanceInM <= radiusInM) {
        monumentsWithinRadius.push(newMonument);
      }
    });

    return monumentsWithinRadius;
  };

  static async getVisitsForMonument(idMonument: string) {
    const visitsRef = collection(db, "visits");
    const queryVisit = query(visitsRef, where("idMonument", "==", idMonument));
    const visitSnapshot = await getDocs(queryVisit);

    return Promise.all(
      visitSnapshot.docs.map(async (visit) => {
        const usersDocRef = doc(db, "users", visit.data().idUser);
        const usersSnapshot = await getDoc(usersDocRef);
        const usersData = usersSnapshot.data();

        return {
          idMonument: visit.data().idMonument,
          idUser: visit.data().idUser,
          review: visit.data().review || "",
          reviewDate: visit.data().reviewDate || null,
          username: usersData?.username || "",
        };
      })
    );
  }

}


