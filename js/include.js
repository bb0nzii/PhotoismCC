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




// // 테스트 다시1
// function includeHTML(callback) {
//   const elements = document.querySelectorAll("[w3-include-html]");
//   let loadedCount = 0;
//   const total = elements.length;

//   if (total === 0) {
//     if (callback) callback();
//     return;
//   }

//   elements.forEach(el => {
//     const file = el.getAttribute("w3-include-html");
//     if (file) {
//       fetch(file)
//         .then(response => {
//           if (!response.ok) throw new Error("Page not found");
//           return response.text();
//         })
//         .then(data => {
//           el.innerHTML = data;

//           // include된 HTML 안의 <script> 실행
//           const scripts = el.querySelectorAll("script");
//           scripts.forEach(oldScript => {
//             const newScript = document.createElement("script");
//             if (oldScript.src) {
//               newScript.src = oldScript.src;
//             } else {
//               newScript.textContent = oldScript.textContent;
//             }
//             document.body.appendChild(newScript);
//           });
//         })
//         .catch(err => {
//           el.innerHTML = "Page not found.";
//           console.error(err);
//         })
//         .finally(() => {
//           loadedCount++;
//           if (loadedCount === total && typeof callback === "function") {
//             callback();
//           }
//         });
//     }
//   });
// }

// includeHTML(() => {
//   const script = document.createElement("script");

//   const isGithubPages = window.location.hostname.includes("github.io");

//   if (isGithubPages) {
//     // GitHub Pages: 레포 이름 기준 절대경로
//     script.src = "/PhotosimCC/js/header.js";
//   } else {
//     // 로컬: 현재 HTML 위치 기준 상대경로 계산
//     const pathDepth = window.location.pathname.split("/").length - 2; 
//     // -2: 첫 /와 파일명 제외
//     let pathPrefix = "";
//     for (let i = 0; i < pathDepth; i++) pathPrefix += "../";

//     script.src = pathPrefix + "js/header.js";
//   }

//   document.body.appendChild(script);
// });




//테스트 다시2
// function includeHTML(callback) {
//   const elements = document.querySelectorAll("[w3-include-html]");
//   let loadedCount = 0;
//   const total = elements.length;

//   if (total === 0) {
//     if (callback) callback();
//     return;
//   }

//   elements.forEach(el => {
//     const file = el.getAttribute("w3-include-html");
//     if (file) {
//       fetch(file)
//         .then(response => {
//           if (!response.ok) throw new Error("Page not found");
//           return response.text();
//         })
//         .then(data => {
//           el.innerHTML = data;
//         })
//         .catch(err => {
//           el.innerHTML = "Page not found.";
//           console.error(err);
//         })
//         .finally(() => {
//           loadedCount++;
//           if (loadedCount === total && typeof callback === "function") {
//             callback();
//           }
//         });
//     }
//   });
// }

// // include 완료 후 header.js 자동 추가
// includeHTML(() => {
//   const script = document.createElement("script");

//   const isGithubPages = window.location.hostname.includes("github.io");

//   if (isGithubPages) {
//     // GitHub raw 링크 절대경로
//     script.src = "https://raw.githubusercontent.com/bb0nzii/PhotoismCC/main/js/header.js";
//   } else {
//     // 로컬 환경: 현재 HTML 위치 기준 상대경로 계산
//     const pathParts = window.location.pathname.split("/");
//     pathParts.pop(); // 파일명 제거
//     let pathPrefix = pathParts.map(() => "../").join("");
//     if (pathPrefix === "") pathPrefix = "./";
//     script.src = pathPrefix + "js/header.js";
//   }

//   // DOM이 준비된 후 load 이벤트 실행
//   script.addEventListener("load", () => {
//     console.log("✅ header.js loaded");
//   });

//   document.body.appendChild(script);
// });



// //테스트 다시3
// function includeHTML(callback) {
//   const elements = document.querySelectorAll("[w3-include-html]");
//   let loadedCount = 0;
//   const total = elements.length;

//   if (total === 0) {
//     if (callback) callback();
//     return;
//   }

//   elements.forEach(el => {
//     const file = el.getAttribute("w3-include-html");
//     if (!file) {
//       loadedCount++;
//       if (loadedCount === total && typeof callback === "function") callback();
//       return;
//     }

//     fetch(file)
//       .then(response => {
//         if (!response.ok) throw new Error("Page not found");
//         return response.text();
//       })
//       .then(data => {
//         el.innerHTML = data;
//       })
//       .catch(err => {
//         el.innerHTML = "Include failed.";
//         console.error(err);
//       })
//       .finally(() => {
//         loadedCount++;
//         if (loadedCount === total && typeof callback === "function") {
//           callback();
//         }
//       });
//   });
// }

// // ✅ include 완료 후 header.js 자동 추가
// includeHTML(() => {
//   const script = document.createElement("script");

//   const isGithubPages = window.location.hostname.includes("github.io");

//   if (isGithubPages) {
//     // GitHub Pages에서 접근 가능한 JS 경로
//     script.src = "https://bb0nzii.github.io/PhotoismCC/js/header.js";
//   } else {
//     // 로컬 환경: 현재 HTML 위치 기준 상대경로 계산
//     const pathParts = window.location.pathname.split("/");
//     pathParts.pop(); // 파일명 제거
//     let pathPrefix = pathParts.map(() => "../").join("");
//     if (pathPrefix === "") pathPrefix = "./";
//     script.src = pathPrefix + "js/header.js";
//   }

//   script.addEventListener("load", () => {
//     console.log("✅ header.js loaded");
//   });

//   document.body.appendChild(script);
// });



// 테스트 다시4
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
    if (!file) {
      loadedCount++;
      if (loadedCount === total && typeof callback === "function") callback();
      return;
    }

    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error("Page not found");
        return response.text();
      })
      .then(data => {
        el.innerHTML = data;
      })
      .catch(err => {
        el.innerHTML = "Include failed.";
        console.error(err);
      })
      .finally(() => {
        loadedCount++;
        if (loadedCount === total && typeof callback === "function") {
          callback();
        }
      });
  });
}

// ✅ include 완료 후 바로 이벤트 등록
includeHTML(() => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".top-navbar");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
      console.log("👉 메뉴 토글 클릭됨");
    });
    console.log("✅ header loaded & event bound");
  } else {
    console.error("❌ menu-toggle 또는 top-navbar를 찾을 수 없음");
  }
});