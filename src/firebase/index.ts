// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCpxSrArIF3PLUPhFf8pNZCrt9hQq1E3dU",
  authDomain: "monumentgo-devlo.firebaseapp.com",
  projectId: "monumentgo-devlo",
  storageBucket: "monumentgo-devlo.appspot.com",
  messagingSenderId: "177075504513",
  appId: "1:177075504513:web:35e1d6a53cbd1cae725480"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {
    db,
    auth
}