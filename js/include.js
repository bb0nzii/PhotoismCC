// function includeHTML() {
//   const elements = document.querySelectorAll("[w3-include-html]");
//   elements.forEach(el => {
//     const file = el.getAttribute("w3-include-html");
//     if (file) {
//       fetch(file)
//         .then(response => response.text())
//         .then(data => {
//           el.innerHTML = data;

//           // ✅ header.js 같은 스크립트 태그 실행시키기
//           const scripts = el.querySelectorAll("script");
//           scripts.forEach(oldScript => {
//             const newScript = document.createElement("script");
//             if (oldScript.src) {
//               newScript.src = oldScript.src; // 외부 js
//             } else {
//               newScript.textContent = oldScript.textContent; // inline js
//             }
//             document.body.appendChild(newScript);
//           });
//         })
//         .catch(err => {
//           el.innerHTML = "Page not found.";
//         });
//     }
//   });
// }

// // include 끝난 뒤 header.js 실행
// includeHTML(() => {
//   const script = document.createElement("script");
//   script.src = "./js/header.js";
//   document.body.appendChild(script);
// });




// 테스트 다시1
function includeHTML(callback) {
  const elements = document.querySelectorAll("[w3-include-html]");
  let loadedCount = 0;
  const total = elements.length;

  if (total === 0) {
    if (callback) callback();
    return;
  }

  elements.forEach(el => {
    const file = el.getAttribute("w3-include-html");
    if (file) {
      fetch(file)
        .then(response => {
          if (!response.ok) throw new Error("Page not found");
          return response.text();
        })
        .then(data => {
          el.innerHTML = data;

          // include된 HTML 안의 <script> 실행
          const scripts = el.querySelectorAll("script");
          scripts.forEach(oldScript => {
            const newScript = document.createElement("script");
            if (oldScript.src) {
              newScript.src = oldScript.src;
            } else {
              newScript.textContent = oldScript.textContent;
            }
            document.body.appendChild(newScript);
          });
        })
        .catch(err => {
          el.innerHTML = "Page not found.";
          console.error(err);
        })
        .finally(() => {
          loadedCount++;
          if (loadedCount === total && typeof callback === "function") {
            callback();
          }
        });
    }
  });
}

includeHTML(() => {
  const script = document.createElement("script");

  const isGithubPages = window.location.hostname.includes("github.io");

  if (isGithubPages) {
    // GitHub Pages: 레포 이름 기준 절대경로
    script.src = "/PhotosimCC/js/header.js";
  } else {
    // 로컬: 현재 HTML 위치 기준 상대경로 계산
    const pathDepth = window.location.pathname.split("/").length - 2; 
    // -2: 첫 /와 파일명 제외
    let pathPrefix = "";
    for (let i = 0; i < pathDepth; i++) pathPrefix += "../";

    script.src = pathPrefix + "js/header.js";
  }

  document.body.appendChild(script);
});

