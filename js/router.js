import { renderHomePage } from './pages/home.js';
import { renderDirectoryPage } from './pages/directory.js';
import { renderBusinessProfilePage } from './pages/businessProfile.js';
import { renderIndustryPage } from './pages/industry.js';
import { renderNewsPage } from './pages/news.js';
import { renderArticlePage } from './pages/article.js';
import { renderEventsPage } from './pages/events.js';
import { renderEventDetailPage } from './pages/eventDetail.js';
import { renderLearnPage } from './pages/learn.js';
import { renderOpportunitiesPage } from './pages/opportunities.js';
import { renderHeader, renderMobileBottomNav, renderFooter, renderTickerRibbon } from './components/navigation.js';
import { renderFloatingConcierge } from './components/concierge.js';
import { initTouchCarousel } from './components/carousel.js';
import { initTypeformModal } from './components/typeformModal.js';

export function handleRoute() {
  const hash = window.location.hash.slice(1) || "/";
  const path = hash.split("?")[0];
  const mainContainer = document.getElementById("app-main");
  const headerContainer = document.getElementById("app-header");
  const tickerContainer = document.getElementById("app-ticker");
  const bottomNavContainer = document.getElementById("app-bottom-nav");
  const footerContainer = document.getElementById("app-footer");
  const conciergeContainer = document.getElementById("app-concierge");

  if (tickerContainer && !tickerContainer.innerHTML.trim()) {
    tickerContainer.innerHTML = renderTickerRibbon();
  }

  let routeKey = "";
  if (path === "/" || path === "") {
    routeKey = "home";
    mainContainer.innerHTML = renderHomePage();
  } else if (path === "/directory") {
    routeKey = "directory";
    mainContainer.innerHTML = renderDirectoryPage();
  } else if (path.startsWith("/business/")) {
    routeKey = "business";
    const slug = path.replace("/business/", "");
    mainContainer.innerHTML = renderBusinessProfilePage(slug);
  } else if (path.startsWith("/industry/")) {
    routeKey = path.slice(1);
    const slug = path.replace("/industry/", "");
    mainContainer.innerHTML = renderIndustryPage(slug);
  } else if (path === "/news") {
    routeKey = "news";
    mainContainer.innerHTML = renderNewsPage();
  } else if (path.startsWith("/article/")) {
    routeKey = "article";
    const slug = path.replace("/article/", "");
    mainContainer.innerHTML = renderArticlePage(slug);
  } else if (path === "/events") {
    routeKey = "events";
    mainContainer.innerHTML = renderEventsPage();
  } else if (path.startsWith("/event/")) {
    routeKey = "event";
    const slug = path.replace("/event/", "");
    mainContainer.innerHTML = renderEventDetailPage(slug);
  } else if (path === "/learn") {
    routeKey = "learn";
    mainContainer.innerHTML = renderLearnPage();
  } else if (path === "/opportunities") {
    routeKey = "opportunities";
    mainContainer.innerHTML = renderOpportunitiesPage();
  } else {
    routeKey = "home";
    mainContainer.innerHTML = renderHomePage();
  }

  // Update Navigation & Global Shell
  headerContainer.innerHTML = renderHeader(routeKey);
  bottomNavContainer.innerHTML = renderMobileBottomNav(routeKey);
  footerContainer.innerHTML = renderFooter();
  conciergeContainer.innerHTML = renderFloatingConcierge();

  // Initialize carousels on page if present
  document.querySelectorAll(".carousel-track").forEach(track => {
    initTouchCarousel(track);
  });
}

export function initRouter() {
  window.addEventListener("hashchange", handleRoute);
  window.addEventListener("pulso-lang-change", () => {
    handleRoute();
  });
  initTypeformModal();
  handleRoute();
}
