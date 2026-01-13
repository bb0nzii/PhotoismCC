//header.js
console.log("✅ header.js loaded");

const toggle = document.querySelector(".header__toggle");
const nav = document.querySelector(".header__menu");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("header--open");
    console.log("👉 메뉴 토글 클릭됨");
  });
} else {
  console.error("❌ menu-toggle 또는 top-navbar를 찾을 수 없음");
}