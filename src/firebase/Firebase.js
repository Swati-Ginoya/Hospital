
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrrxwSe6Jwm6pF4-N6kfQ6vRNKS-4q2rQ",
  authDomain: "hospital-457fe.firebaseapp.com",
  projectId: "hospital-457fe",
  storageBucket: "hospital-457fe.appspot.com",
  messagingSenderId: "783073069984",
  appId: "1:783073069984:web:4809df5659354784dc32c5",
  measurementId: "G-L8XNVT1T94"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);