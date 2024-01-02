import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//import {
//  PUBLIC_API_KEY,
//  PUBLIC_AUTH_DOMAIN,
//  PUBLIC_PROJECT_ID,
//  PUBLIC_STORAGE_BUCKET,
//  PUBLIC_MESSAGING_SENDER_ID,
//  PUBLIC_APP_ID,
//  PUBLIC_MEASUREMENT_ID } from '$env/static/private';

const firebaseConfig = {
  apiKey: "AIzaSyD14aV0GfJaeLQg6ssqMMUoP3144ElbMXk",
  authDomain: "mahanamapapers.firebaseapp.com",
  projectId: "mahanamapapers",
  storageBucket: "mahanamapapers.appspot.com",
  messagingSenderId: "279591489570",
  appId: "1:279591489570:web:252323934e03a4c211ba7b",
  measurementId: "G-PCQ6VQ9Q3S"
  //apiKey: PUBLIC_API_KEY,
  //authDomain: PUBLIC_AUTH_DOMAIN,
  //projectId: PUBLIC_PROJECT_ID,
  //storageBucket: PUBLIC_STORAGE_BUCKET,
  //messagingSenderId: PUBLIC_MESSAGING_SENDER_ID,
  //appId: PUBLIC_APP_ID,
  //measurementId: PUBLIC_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, storage, db };
