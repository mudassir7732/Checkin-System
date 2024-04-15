import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHEQdNHtgz4Dj7mNM3xTozNqedSGUEIHU",
  authDomain: "wonder-crafts-2c771.firebaseapp.com",
  projectId: "wonder-crafts-2c771",
  storageBucket: "wonder-crafts-2c771.appspot.com",
  messagingSenderId: "811035487193",
  appId: "1:811035487193:web:de28417d48231a80fe47c8"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export default db;