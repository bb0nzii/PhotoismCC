import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const SESSION_KEY = "site-auth";
const EXPIRE_TIME = 1000 * 60 * 60; // 1시간

// 🔹 인증 여부 확인
export function checkAuth() {
  const data = sessionStorage.getItem(SESSION_KEY);
  if (!data) return false;

  const { time } = JSON.parse(data);

  if (Date.now() - time > EXPIRE_TIME) {
    sessionStorage.removeItem(SESSION_KEY);
    return false;
  }

  return true;
}

// 🔹 Firebase 비밀번호 검증
export async function loginWithPassword(inputPassword) {
  const ref = doc(db, "auth", "config");
  const snap = await getDoc(ref);

  if (!snap.exists()) return false;

  const { password } = snap.data();

  if (inputPassword === password) {
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ time: Date.now() })
    );
    return true;
  }

  return false;
}

// 🔹 로그아웃 (선택)
export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  location.href = "/login.html";
}