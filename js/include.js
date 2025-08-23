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




// test2
// function includeHTML(callback) {
//   const elements = document.querySelectorAll("[w3-include-html]");
//   let loadedCount = 0;
//   const total = elements.length;

//   if (total === 0) {
//     if (callback) callback(); // include 대상 없으면 바로 실행
//     return;
//   }

//   elements.forEach(el => {
//     const file = el.getAttribute("w3-include-html");
//     if (file) {
//       fetch(file)
//         .then(response => response.text())
//         .then(data => {
//           el.innerHTML = data;

//           // ✅ include된 HTML 안에 있는 <script> 실행
//           const scripts = el.querySelectorAll("script");
//           scripts.forEach(oldScript => {
//             const newScript = document.createElement("script");
//             if (oldScript.src) {
//               newScript.src = oldScript.src; // 외부 JS
//             } else {
//               newScript.textContent = oldScript.textContent; // inline JS
//             }
//             document.body.appendChild(newScript);
//           });
//         })
//         .catch(err => {
//           el.innerHTML = "Page not found.";
//         })
//         .finally(() => {
//           loadedCount++;
//           if (loadedCount === total && callback) {
//             callback(); // 모든 include 끝난 뒤 콜백 실행
//           }
//         });
//     }
//   });
// }

// // ✅ 사용법
// includeHTML(() => {
//   console.log("모든 include 완료됨 ✅");
//   // header.js가 자동으로 따라오지 않는다면 여기서 실행
//   const script = document.createElement("script");
//   script.src = "/js/header.js"; // 경로 주의
//   document.body.appendChild(script);
// });



//test3
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
        .then(response => response.text())
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

// ✅ include 완료 후 header.js 자동 추가
includeHTML(() => {
  // 현재 페이지 URL 기준으로 header.js 위치 계산
  // 예: /sub/takeover-1.html → ../js/header.js
  let pathPrefix = "";
  const pathDepth = window.location.pathname.split("/").length - 2; 
  // -2: 첫 /와 파일명 제외
  for (let i = 0; i < pathDepth; i++) pathPrefix += "../";

  const script = document.createElement("script");
  script.src = pathPrefix + "js/header.js";
  document.body.appendChild(script);
});
