import { initializeApp } from "firebase/app";
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDP6JyJxI8rCfVIEtyTd9olcZLTufSXRvQ",
  authDomain: "izzah7145.firebaseapp.com",
  projectId: "izzah7145",
  storageBucket: "izzah7145.firebasestorage.app",
  messagingSenderId: "753904537067",
  appId: "1:753904537067:web:bb88ced0a482a103a5ddae",
  measurementId: "G-JZYB9XP9SH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with persistence
const db = initializeFirestore(app, {
  localCache: persistentMultipleTabManager(), // For multi-tab sync
  // OR for single-tab persistence:
  // localCache: persistentLocalCache()
});

export { app, db };
