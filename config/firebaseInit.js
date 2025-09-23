import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
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

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 🔐 Inicializa o Auth com persistência — sem duplicar
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (_e) {
  console.log("Auth já foi inicializado.");
}

const db = getFirestore(app);

export { auth, db };

