import { GoogleAuthProvider, getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCSSpB3wWkXbR-RHFgXw_syriPyn282R2Q",
  authDomain: "trailers-3f314.firebaseapp.com",
  projectId: "trailers-3f314",
  storageBucket: "trailers-3f314.appspot.com",
  messagingSenderId: "861404822993",
  appId: "1:861404822993:web:317c548320f3a88dfdf4f0"
  };
  
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const firestore = firebaseApp.firestore();
  const storage = firebase.storage()
  const auth=getAuth(firebaseApp);
  const provider=new GoogleAuthProvider();

  export {
  storage,firestore as default, auth, provider

}