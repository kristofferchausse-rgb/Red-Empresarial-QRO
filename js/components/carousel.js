import { icon } from './icons.js';

export function renderCarousel(id, itemsHtml, options = {}) {
  const { title = "", subtitle = "", eyebrow = "", actionHtml = "" } = options;

  return `
    <div class="carousel-wrapper" id="${id}-wrapper">
      <div class="section-header with-action">
        <div>
          ${eyebrow ? `<div class="section-eyebrow">${eyebrow}</div>` : ''}
          ${title ? `<h2 class="section-title">${title}</h2>` : ''}
          ${subtitle ? `<p class="section-subtitle">${subtitle}</p>` : ''}
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          ${actionHtml}
          <div class="carousel-controls">
            <button class="carousel-btn prev-btn" aria-label="Previous" onclick="window.scrollCarousel('${id}', -1)" title="Previous Slide">
              ${icon("chevron-left", "", 18)}
            </button>
            <button class="carousel-btn next-btn" aria-label="Next" onclick="window.scrollCarousel('${id}', 1)" title="Next Slide">
              ${icon("chevron-right", "", 18)}
            </button>
          </div>
        </div>
      </div>

      <div class="carousel-container">
        <div class="carousel-track" id="${id}">
          ${itemsHtml}
        </div>
      </div>
    </div>
  `;
}

window.scrollCarousel = function(carouselId, direction) {
  const track = document.getElementById(carouselId);
  if (!track) return;
  const cardWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 28 : 380;
  track.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
};

export function initTouchCarousel(trackElement) {
  if (!trackElement) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  trackElement.addEventListener('mousedown', (e) => {
    isDown = true;
    trackElement.classList.add('active');
    startX = e.pageX - trackElement.offsetLeft;
    scrollLeft = trackElement.scrollLeft;
  });

  trackElement.addEventListener('mouseleave', () => {
    isDown = false;
    trackElement.classList.remove('active');
  });

  trackElement.addEventListener('mouseup', () => {
    isDown = false;
    trackElement.classList.remove('active');
  });

  trackElement.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - trackElement.offsetLeft;
    const walk = (x - startX) * 1.5;
    trackElement.scrollLeft = scrollLeft - walk;
  });
}
