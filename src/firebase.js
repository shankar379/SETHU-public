import { initializeApp } from "firebase/app";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import { getDatabase, ref, set, get, child, remove, onValue, push, update } from "firebase/database"; // Add 'update' here
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import authentication

const firebaseConfig = {
  apiKey: "AIzaSyCYrr94d5ZxcVO9jjlzvJEiUM1orq_z_Qw",
  authDomain: "vslr-demo.firebaseapp.com",
  databaseURL: "https://vslr-demo-default-rtdb.firebaseio.com",
  projectId: "vslr-demo",
  storageBucket: "vslr-demo.appspot.com",
  messagingSenderId: "1087261009646",
  appId: "1:1087261009646:web:b97317251567dec19575ff",
  measurementId: "G-EPR20Y2D8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app); 
const database = getDatabase(app); 
const db = getFirestore(app); 
const auth = getAuth(app); // Initialize auth

// Export all the necessary Firebase services
export { db, storage, database, storageRef, uploadBytes, getDownloadURL, deleteObject, listAll, ref, set, get, child, remove, onValue, push, update, auth }; // Export 'update'
