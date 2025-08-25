function includeHTML() {
  const elements = document.querySelectorAll("[w3-include-html]");
  elements.forEach(el => {
    const file = el.getAttribute("w3-include-html");
    if (file) {
      fetch(file)
        .then(response => response.text())
        .then(data => {
          el.innerHTML = data;

          // ✅ header.js 같은 스크립트 태그 실행시키기
          const scripts = el.querySelectorAll("script");
          scripts.forEach(oldScript => {
            const newScript = document.createElement("script");
            if (oldScript.src) {
              newScript.src = oldScript.src; // 외부 js
            } else {
              newScript.textContent = oldScript.textContent; // inline js
            }
            document.body.appendChild(newScript);
          });
        })
        .catch(err => {
          el.innerHTML = "Page not found.";
        });
    }
  });
}

// include 끝난 뒤 header.js 실행
includeHTML(() => {
  const script = document.createElement("script");
  script.src = "../js/header.js";
  document.body.appendChild(script);
});