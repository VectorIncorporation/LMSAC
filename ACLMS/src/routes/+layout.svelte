<script>
    import "../app.css"
    import Header from "../lib/components/Header.svelte";
    import { FirebaseApp } from "sveltefire"
    import { auth, db, storage } from "../lib/Firebase"
    //import { app } from "../lib/Firebase"
    //import { getAuth } from "firebase/auth";
    //import { initializeApp } from "firebase/app";
    //import { getFirestore } from "firebase/firestore";
    //import { getStorage } from "firebase/storage";
//
    //const firebaseConfig = {
    //  apiKey: "AIzaSyD14aV0GfJaeLQg6ssqMMUoP3144ElbMXk",
    //  authDomain: "mahanamapapers.firebaseapp.com",
    //  projectId: "mahanamapapers",
    //  storageBucket: "mahanamapapers.appspot.com",
    //  messagingSenderId: "279591489570",
    //  appId: "1:279591489570:web:252323934e03a4c211ba7b",
    //  measurementId: "G-PCQ6VQ9Q3S"
    //};
//
    //const app = initializeApp(firebaseConfig)
    //const auth = getAuth(app)
    //const firestore = getFirestore(app)
    //const storage = getStorage(app)
    export const prerender = true;
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&family=Open+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</svelte:head>

<FirebaseApp {auth} {db} {storage}>
    <Header />
    <slot />
</FirebaseApp>

<style>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
</style>