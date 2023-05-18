import { auth, db } from "@/firebase";
import { doc, setDoc, onSnapshot, where, query, collection, getDocs, getDoc, updateDoc, arrayUnion, arrayRemove, increment } from "firebase/firestore";
import type { ReviewInterface, PartialMonumentInterface } from "@/shared/interfaces";


export class UserService {

  static async getUser(callback: any) {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          callback(doc);
        } else {
          return;
        }
      });
      return unsubscribe;
    }
  };

  static async getIsMonumentVisitedByUser(idMonument: string) {
    const user = auth.currentUser;
    if (user) {
      const visitsRef = collection(db, "visits");
      const queryVisit = query(visitsRef, where("idUser", "==", user.uid), where("idMonument", "==", idMonument));
      const visitSnapshot = await getDocs(queryVisit);

      return visitSnapshot.docs.length > 0;
    }
  };

  static async getListOfVisitedMonuments(userId: string): Promise<PartialMonumentInterface[]> {
    const visitedMonumentsList: PartialMonumentInterface[] = [];
    const visitsRef = collection(db, "visits");
    const qVisit = query(visitsRef, where("idUser", "==", userId));
    const visitSnapshot = await getDocs(qVisit);

    const promises = visitSnapshot.docs.map(async (visit) => {
      const monumentDoc = await getDoc(doc(db, "monuments", visit.data().idMonument));
      return { ...monumentDoc.data(), id: monumentDoc.id };
    });

    const completedMonuments = await Promise.all(promises);
    visitedMonumentsList.push(...completedMonuments);
    return visitedMonumentsList;
  }

  static async getListOfReviews(idUser: string): Promise<ReviewInterface[]> {
    const reviews: ReviewInterface[] = [];

    const visitsRef = collection(db, "visits");
    const queryVisit = query(visitsRef, where("idUser", "==", idUser));
    const visitSnapshot = await getDocs(queryVisit);

    const monumentPromises = visitSnapshot.docs.map(async (visit) => {
      const monumentDocRef = doc(db, "monuments", visit.data().idMonument);
      const monumentSnapshot = await getDoc(monumentDocRef);
      const monumentData = monumentSnapshot.data();

      if (visit.data().reviewDate != null) {
        const review: ReviewInterface = {
          idMonument: visit.data().idMonument,
          idUser: visit.data().idUser,
          username: visit.data().username,
          reviewDate: visit.data().reviewDate,
          review: visit.data().review,
          monumentName: monumentData?.name || "",
          mainPhoto: monumentData?.mainPhoto || "",
        };
        reviews.push(review);
      }
    });

    await Promise.all(monumentPromises);

    return reviews;
  }

  static async changeUserInfos(user: any) {
    const userRef = doc(db, "users", user.id);
    await updateDoc(userRef, {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      phoneNumber: user.phoneNumber,
      age: user.age
    });
  };

  static async toggleMonumentLike(idMonument: string) {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const favorites = userDoc.data()?.favorites || [];
        const monumentIndex = favorites.indexOf(idMonument);
        const monumentRef = doc(db, "monuments", idMonument);

        if (monumentIndex === -1) {
          await updateDoc(userRef, {
            favorites: arrayUnion(idMonument)
          });
          await updateDoc(monumentRef, {
            likes: increment(1)
          });
        } else {
          await updateDoc(userRef, {
            favorites: arrayRemove(idMonument)
          });
          await updateDoc(monumentRef, {
            likes: increment(-1)
          });
        }
      }
    }
  };

  static async toggleMonumentToSee(idMonument: string) {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const toSee = userDoc.data().toSee || [];
        const monumentIndex = toSee.indexOf(idMonument);

        if (monumentIndex === -1) {
          await updateDoc(userRef, {
            toSee: arrayUnion(idMonument)
          });
        } else {
          await updateDoc(userRef, {
            toSee: arrayRemove(idMonument)
          });
        }
      }
    }
  };

  static async deleteReview(idMonument: string) {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const visitsCol = collection(db, "visits");
        const queryVisit = query(visitsCol, where("idUser", "==", user.uid), where("idMonument", "==", idMonument));
        const visitSnapshot = await getDocs(queryVisit);

        const visitRef = doc(db, "visits", visitSnapshot.docs[0].id);
        await updateDoc(visitRef, {
          review: "",
          reviewDate: null,
        });

        const updatedUserDoc = await getDoc(userRef);
        if (updatedUserDoc.exists()) {
          const updatedUser = updatedUserDoc.data();
          updatedUser.reviews = updatedUser.reviews.filter((review: any) => review.idMonument != idMonument);
          await updateDoc(userRef, updatedUser);
        }
      }
    }
  };

  static async addAndUpdateReview(review: ReviewInterface) {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const visitsCol = collection(db, "visits");
        const queryVisit = query(visitsCol, where("idUser", "==", user.uid), where("idMonument", "==", review.idMonument));
        const visitSnapshot = await getDocs(queryVisit);
        const visitDoc = visitSnapshot.docs[0];
        const visitRef = visitDoc.ref;

        await updateDoc(visitRef, {
          review: review.review,
          reviewDate: review.reviewDate,
        });

      }
    }
  };

}

