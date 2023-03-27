// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo5ZbBv-B2P4--LkFL4ziOOdiIWD1T21M",
  authDomain: "todo-with-react-and-fire-6a5a8.firebaseapp.com",
  projectId: "todo-with-react-and-fire-6a5a8",
  storageBucket: "todo-with-react-and-fire-6a5a8.appspot.com",
  messagingSenderId: "503827273255",
  appId: "1:503827273255:web:ee20b01268ceab98232002"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
