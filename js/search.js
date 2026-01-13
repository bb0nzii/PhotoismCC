// search

function initSearch() {
  const searchBox = document.querySelector(".handover-search");
  const toggleBtn = document.querySelector(".handover-search-toggle");

  const input = document.querySelector(".handover-search__input");
  const searchBtn = document.querySelector(".handover-search__btn");
  const prevBtn = document.querySelector(".handover-search__prev");
  const nextBtn = document.querySelector(".handover-search__next");
  const countEl = document.querySelector(".handover-search__count");

  if (!searchBox || !input || !searchBtn) return;

  let results = [];
  let currentIndex = -1;

  /* ---------- UI 토글 ---------- */
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      searchBox.classList.toggle("is-open");

      if (searchBox.classList.contains("is-open")) {
        input.focus();
      }
    });
  }

  function closeSearch() {
    searchBox.classList.remove("is-open");
  }

  /* ---------- 검색 로직 ---------- */
  function updateCount() {
    countEl.textContent =
      results.length === 0 ? "" : `${currentIndex + 1} / ${results.length}`;
  }

  function clearHighlights() {
    results.forEach(el => el.classList.remove("is-search-hit"));
  }

  function moveTo(index) {
    if (!results[index]) return;

    clearHighlights();
    currentIndex = index;

    const target = results[currentIndex];
    target.classList.add("is-search-hit");

    target.scrollIntoView({ behavior: "smooth", block: "center" });
    updateCount();
  }

  function search() {
    const keyword = input.value.trim().toLowerCase();
    if (!keyword) return;

    clearHighlights();
    results = [];
    currentIndex = -1;

    document
      .querySelectorAll(".handover-layout__content *")
      .forEach(el => {
        if (
          el.children.length === 0 &&
          el.textContent.toLowerCase().includes(keyword)
        ) {
          results.push(el);
        }
      });

    if (results.length === 0) {
      alert(`"${input.value}"에 대한 검색 결과가 없습니다.`);
      updateCount();
      return;
    }

    moveTo(0);

    // 📱 모바일 UX: 검색 후 자동 닫기 (선택)
    if (window.innerWidth <= 768) {
      closeSearch();
    }
  }

  /* ---------- 이벤트 ---------- */
  searchBtn.addEventListener("click", search);

  input.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.isComposing) {
      e.preventDefault();
      search();
    }
    if (e.key === "Escape") {
      closeSearch();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (results.length) moveTo((currentIndex + 1) % results.length);
  });

  prevBtn.addEventListener("click", () => {
    if (results.length)
      moveTo((currentIndex - 1 + results.length) % results.length);
  });
}

/* include 대응 */
const searchObserver = new MutationObserver(() => {
  if (
    document.querySelector(".handover-search__input") &&
    document.querySelector(".handover-search-toggle")
  ) {
    initSearch();
    searchObserver.disconnect();
  }
});

searchObserver.observe(document.body, {
  childList: true,
  subtree: true
});




/*
function initSearch() {
  const input = document.querySelector(".handover-search__input");
  const searchBtn = document.querySelector(".handover-search__btn");
  const prevBtn = document.querySelector(".handover-search__prev");
  const nextBtn = document.querySelector(".handover-search__next");
  const countEl = document.querySelector(".handover-search__count");

  if (!input || !searchBtn) return;

  let results = [];
  let currentIndex = -1;

  function updateCount() {
    countEl.textContent =
      results.length === 0 ? "" : `${currentIndex + 1} / ${results.length}`;
  }

  function clearHighlights() {
    results.forEach(el => el.classList.remove("is-search-hit"));
  }

  function moveTo(index) {
    if (!results[index]) return;

    clearHighlights();
    currentIndex = index;

    const target = results[currentIndex];
    target.classList.add("is-search-hit");

    target.scrollIntoView({ behavior: "smooth", block: "center" });
    updateCount();
  }

  function search() {
    const keyword = input.value.trim().toLowerCase();
    if (!keyword) return;

    clearHighlights();
    results = [];
    currentIndex = -1;

    document
      .querySelectorAll(".handover-layout__content *")
      .forEach(el => {
        if (
          el.children.length === 0 &&
          el.textContent.toLowerCase().includes(keyword)
        ) {
          results.push(el);
        }
      });

    if (results.length === 0) {
      alert(`"${input.value}"에 대한 검색 결과가 없습니다.`);
      updateCount();
      return;
    }

    moveTo(0);
  }

  searchBtn.addEventListener("click", search);

  input.addEventListener("keyup", e => {
    if (e.key === "Enter") {
      search();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (results.length) moveTo((currentIndex + 1) % results.length);
  });

  prevBtn.addEventListener("click", () => {
    if (results.length)
      moveTo((currentIndex - 1 + results.length) % results.length);
  });
}

// 🔑 include로 DOM 들어올 때까지 기다림
const searchObserver = new MutationObserver(() => {
  if (document.querySelector(".handover-search__input")) {
    initSearch();
    searchObserver.disconnect();
  }
});

searchObserver.observe(document.body, {
  childList: true,
  subtree: true
});
*/



/*
handover 문서 특성상 정보량이 많아
키워드 기반 페이지 내 검색 기능을 구현했습니다.
검색 결과가 여러 개인 경우 이전/다음 탐색이 가능하도록 UX를 보완했습니다.
*/