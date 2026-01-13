// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 Firebase 콘솔에서 복사한 config
const firebaseConfig = {
  apiKey: "AIzaSyDHJnSqCFQXVe65iUxuQ1mIRHPhydSXahI",
  authDomain: "photoism-bbs.firebaseapp.com",
  projectId: "photoism-bbs",
  storageBucket: "photoism-bbs.firebasestorage.app",
  messagingSenderId: "807406712896",
  appId: "1:807406712896:web:7f0a9181aca06f58f887a5"
};

// 초기화
const app = initializeApp(firebaseConfig);

// Firestore 연결
export const db = getFirestore(app);