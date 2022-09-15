// import * as firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWfTMzBJrtMEL2q5KGykHpqPm9-mX1uns",
  authDomain: "project-ergotherapy-beb7-2938f.firebaseapp.com",
  projectId: "project-ergotherapy-beb7-2938f",
  storageBucket: "project-ergotherapy-beb7-2938f.appspot.com",
  messagingSenderId: "1030044930401",
  appId: "1:1030044930401:web:c7b5981a840b9342103520",
  measurementId: "G-DDBYJN1FEQ",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
