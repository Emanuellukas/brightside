// Your web app's Firebase configuration
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: "AIzaSyB1eL1YeNcC5T1oVMm85jtJ93oxXfwIwjY",
    authDomain: "snt-db.firebaseapp.com",
    projectId: "snt-db",
    storageBucket: "snt-db.appspot.com",
    messagingSenderId: "237044550945",
    appId: "1:237044550945:web:724a2e2e1696bf1ca18260",
    measurementId: "G-FBCKZGPHWF"
}

let app = null, db = null, collections = {};

// Initialize Firebase
async function init() {
    try {
        app = await initializeApp(firebaseConfig);
        db = await getFirestore(app)
        await setCollections(db)
    } catch (error) {
        console.error(error)
    }
}

async function setCollections(db) {
    try {
        collections.LatestArticles = collection(db, 'latest_articles');
    } catch (error) {
        console.error(error)
    }
}

init()

export { collections }
export default app