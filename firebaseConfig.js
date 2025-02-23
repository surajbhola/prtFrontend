import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyChfaoNnsb9y0H-mCnNwAyTwyt7fWShPso",
  authDomain: "iamsuntalks.firebaseapp.com",
  projectId: "iamsuntalks",
  storageBucket: "iamsuntalks.appspot.com",
  messagingSenderId: "297187021637",
  appId: "1:297187021637:web:307ef776252a2c0f21642c",
  measurementId: "G-20JRC729R9",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
