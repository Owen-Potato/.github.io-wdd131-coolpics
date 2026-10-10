
const menuButton = document.querySelector(".menu-button");
const siteNav = document.querySelector(".site-nav");

menuButton.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

const gallery = document.querySelector(".gallery");

function viewerTemplate(src, alt) {
  return `<div class="viewer" role="dialog" aria-modal="true" aria-label="Image viewer">
    <button class="close-viewer" type="button" aria-label="Close image">X</button>
    <img src="${src}" alt="${alt}">
  </div>`;
}

function closeViewer() {
  const viewer = document.querySelector(".viewer");
  if (viewer) viewer.remove();
  document.removeEventListener("keydown", onKeydown);
}

function onKeydown(event) {
  if (event.key === "Escape") closeViewer();
}

gallery.addEventListener("click", (event) => {
  const img = event.target.closest("img");
  if (!img) return;

  const fullSrc = img.dataset.full || img.getAttribute("src");
  document.body.insertAdjacentHTML("afterbegin", viewerTemplate(fullSrc, img.alt));

  const viewer = document.querySelector(".viewer");
  viewer.addEventListener("click", (e) => {
    if (e.target === viewer || e.target.classList.contains("close-viewer")) {
      closeViewer();
    }
  });
  document.addEventListener("keydown", onKeydown);
  viewer.querySelector(".close-viewer").focus();
});