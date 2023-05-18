import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, signInAnonymously, FacebookAuthProvider, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useUser } from "@/shared/stores/index";


export class AuthService {

  static async createUser(credentials) {
    const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      firstname: credentials.firstname,
      lastname: credentials.lastname,
      username: credentials.username,
      age: 0,
      email: user.email,
      phoneNumber: "",
      toSee: useUser().getCurrentUser.toSee,
      favorites: [],
      finishedCircuits: [],
    });
  };

  static async signIn(credentials) {
    await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
  };

  static async signInAnonymously() {
    await signInAnonymously(auth);
  };

  static async signOut() {
    await signOut(auth);
    await signInAnonymously(auth);
  };

  static async loginWithFacebook() {
    const result = await signInWithPopup(auth, new FacebookAuthProvider);
    const user = result.user;
    const userInfo = getAdditionalUserInfo(result);
  
    await setDoc(doc(db, "users", user.uid), {
      firstname: userInfo?.profile!.given_name,
      lastname: userInfo?.profile!.family_name,
      username: userInfo?.profile!.name,
      age: useUser().getCurrentUser.age,
      email: userInfo?.profile!.email,
      phoneNumber: useUser().getCurrentUser.phoneNumber,
      toSee: useUser().getCurrentUser.toSee,
      favorites: useUser().getCurrentUser.favorites,
      finishedCircuits: useUser().getCurrentUser.finishedCircuits,
    });
  }

  static async loginWithGoogle() {
    const result = await signInWithPopup(auth, new GoogleAuthProvider);
    const user = result.user;
    const userInfo = getAdditionalUserInfo(result);
  
    await setDoc(doc(db, "users", user.uid), {
      firstname: userInfo?.profile!.given_name,
      lastname: userInfo?.profile!.family_name,
      username: userInfo?.profile!.name,
      // age: useUser().getCurrentUser.age,
      email: userInfo?.profile!.email,
      // phoneNumber: useUser().getCurrentUser.phoneNumber,
      // toSee: useUser().getCurrentUser.toSee,
      // favorites: useUser().getCurrentUser.favorites,
      // finishedCircuits: useUser().getCurrentUser.finishedCircuits,
      // *À Vérifier pour conserver les données de l'utilisateur*
    });
  }

}