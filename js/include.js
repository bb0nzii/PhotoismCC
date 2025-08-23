function includeHTML(callback) {
  const elements = document.querySelectorAll('[w3-include-html]');
  let remaining = elements.length;

  if (remaining === 0) {
    if (typeof callback === 'function') callback();
    return;
  }

  elements.forEach(el => {
    const file = el.getAttribute("w3-include-html");
    if (!file) {
      remaining--;
      if (remaining === 0 && typeof callback === 'function') callback();
      return;
    }

    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error("Page not found");
        return response.text();
      })
      .then(data => {
        el.innerHTML = data;
        el.removeAttribute("w3-include-html");
      })
      .catch(error => {
        el.innerHTML = "Include failed.";
        console.error(error);
      })
      .finally(() => {
        remaining--;
        if (remaining === 0 && typeof callback === 'function') callback();
      });
  });
}

// include 끝난 뒤 header.js 실행
includeHTML(() => {
  const script = document.createElement("script");
  script.src = "./js/header.js";
  document.body.appendChild(script);
});