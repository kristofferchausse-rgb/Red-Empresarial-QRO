import { icon } from './icons.js';

export function showToast(message, type = "info") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `${icon(type === "success" ? "check" : "sparkles", "", 18)} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

export function renderSocialShareBar(title, url, tags = ["Querétaro", "B2B", "Nearshoring"]) {
  const currentUrl = url || window.location.href;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(currentUrl);

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&hashtags=${tags.join(",")}`;

  return `
    <div class="social-share-bar" data-share-title="${title}" data-share-url="${currentUrl}">
      <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 4px;">
        ${icon("share2", "", 14)} Share:
      </span>
      <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="share-pill whatsapp" title="Share on WhatsApp">
        ${icon("message-circle", "", 14)} WhatsApp
      </a>
      <a href="${linkedinUrl}" target="_blank" rel="noopener noreferrer" class="share-pill linkedin" title="Share on LinkedIn">
        LinkedIn
      </a>
      <a href="${twitterUrl}" target="_blank" rel="noopener noreferrer" class="share-pill" title="Share on X">
        X / Twitter
      </a>
      <button class="share-pill btn-copy-link" onclick="window.copyToClipboard('${currentUrl}')" title="Copy Link">
        ${icon("file-text", "", 14)} Copy Link
      </button>
    </div>
  `;
}

window.copyToClipboard = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("Link copied to clipboard!", "success");
  }).catch(() => {
    showToast("Link copied!");
  });
};
