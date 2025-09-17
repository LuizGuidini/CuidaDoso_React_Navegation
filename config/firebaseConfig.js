import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvKW2qTS5xjQn2zGh0Ot72loN7zi2GfUI",
  authDomain: "cuidadoso-app.firebaseapp.com",
  projectId: "cuidadoso-app",
  storageBucket: "cuidadoso-app.appspot.com",
  messagingSenderId: "880044616059",
  appId: "1:880044616059:web:3af0ad0dda1e296e8ff5de",
  measurementId: "G-D1KJ9710G5"
};

const app = initializeApp(firebaseConfig);

// ✅ ESSENCIAL: inicializar o Auth com persistência
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };

