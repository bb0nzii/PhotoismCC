(function initScrollTop() {
  const topBtn = document.querySelector(".scroll-top");

  // 아직 include 안 됐으면 재시도
  if (!topBtn) {
    requestAnimationFrame(initScrollTop);
    return;
  }

  // 스크롤 시 표시 제어
  window.addEventListener("scroll", () => {
    topBtn.classList.toggle("is-visible", window.scrollY > 400);
  });

  // 클릭 시 최상단 이동
  topBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
})();

