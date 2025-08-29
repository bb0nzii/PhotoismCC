// -- 탑버튼
const topBtn = document.getElementById("topBtn");

// 스크롤 위치에 따라 버튼 보이기
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});



// -- 인수인계 네비게이션
document.addEventListener("DOMContentLoaded", () => {
  // nav 버튼 id와 섹션 id를 매칭
  const mappings = {
    "takeover-nav-1-1": "takeover-1-1",
    "takeover-nav-1-2": "takeover-1-2",
    "takeover-nav-1-3": "takeover-1-3",
    "takeover-nav-1-4": "takeover-1-4",
    "takeover-nav-2-1": "takeover-2-1",
    "takeover-nav-2-2": "takeover-2-2",
    "takeover-nav-2-3": "takeover-2-3",
    "takeover-nav-2-4": "takeover-2-4",
  };

  Object.keys(mappings).forEach(navId => {
    const navItem = document.getElementById(navId);
    const targetId = mappings[navId];

    if (navItem) {
      navItem.addEventListener("click", () => {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  });
});
