import { newsData } from '../data/news.js';
import { companiesData } from '../data/companies.js';
import { renderSocialShareBar } from '../components/socialShare.js';
import { getLang, getLocalized, t } from '../i18n.js';

export function renderArticlePage(slug) {
  const lang = getLang();
  const isEs = lang === "es";
  const article = newsData.find(a => a.slug === slug) || newsData[0];
  const linkedCompany = companiesData.find(c => c.id === article.linkedCompanyId) || companiesData[0];

  return `
    <div class="animate-fade-in max-w-4xl mx-auto">
      
      <!-- Article Top Navigation -->
      <div class="border-b border-outline-variant pb-4 mb-6 flex items-center justify-between font-mono-data text-mono-data">
        <a href="#/news" class="text-secondary hover:underline flex items-center gap-1 font-bold">
          <span class="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>${isEs ? "Volver a Crónica & Noticias" : "Back to News & Articles"}</span>
        </a>
        <span class="bg-surface-container px-2.5 py-0.5 text-[11px] font-label-caps uppercase border-l-2 border-secondary font-bold">
          ${getLocalized(article, 'category')}
        </span>
      </div>

      <!-- Article Header Spread -->
      <header class="mb-8">
        <span class="font-mono-data text-mono-data text-secondary uppercase tracking-widest font-semibold block mb-2">
          CRÓNICA EMPRESARIAL · ANÁLISIS ESTRATÉGICO
        </span>
        <h1 class="font-headline-lg text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight font-medium mb-4 leading-tight">
          ${getLocalized(article, 'title')}
        </h1>
        <p class="font-headline-sm text-xl italic text-on-surface-variant mb-6 leading-relaxed">
          ${getLocalized(article, 'subtitle')}
        </p>

        <div class="border-t border-b border-outline-variant py-3 flex items-center justify-between flex-wrap gap-4 font-mono-data text-mono-data text-on-surface-variant">
          <div class="flex items-center gap-3">
            <img src="${article.author.avatar}" alt="${article.author.name}" class="w-10 h-10 border border-outline-variant object-cover" />
            <div>
              <div class="font-bold text-primary">${article.author.name}</div>
              <div class="text-[11px]">${getLocalized(article.author, 'role')}</div>
            </div>
          </div>
          <div class="text-xs">
            <span>📅 ${article.publishedDate}</span>
            <span class="mx-2">·</span>
            <span>⏱️ ${getLocalized(article, 'readTime')}</span>
          </div>
        </div>
      </header>

      <!-- Hero Photography -->
      <div class="border border-outline-variant bg-primary-container mb-8 overflow-hidden">
        <img src="${article.heroImage}" alt="${article.title}" class="w-full max-h-[480px] object-cover filter contrast-110" />
      </div>

      <!-- Longform Editorial Body -->
      <article class="prose prose-lg max-w-none text-on-surface space-y-6 font-body-lg text-body-lg leading-relaxed mb-10">
        ${article.content}
      </article>

      <!-- INLINE EDITORIAL CONVERSION LOOP -->
      <div class="border-2 border-secondary bg-surface-container-lowest p-6 sm:p-8 mb-10 shadow-sm">
        <div class="flex items-center justify-between mb-4 pb-2 border-b border-outline-variant">
          <span class="font-mono-data text-mono-data text-secondary uppercase font-bold tracking-widest flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px]">verified</span>
            <span>EMPRESA PROVEEDORA DESTACADA EN ESTE REPORTAJE</span>
          </span>
          <span class="bg-surface-container text-primary text-[10px] font-mono-data uppercase px-2 py-0.5">Capítulo El Marqués</span>
        </div>

        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div class="flex items-center gap-4">
            <img src="${linkedCompany.logo}" alt="${linkedCompany.name}" class="w-14 h-14 border border-outline-variant p-1 bg-surface-container-low object-contain shrink-0" />
            <div>
              <h3 class="font-headline-sm text-xl text-primary font-bold mb-1">${linkedCompany.name}</h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant max-w-md">${getLocalized(linkedCompany.positioning, 'oneLiner')}</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2 shrink-0">
            <a href="#/business/${linkedCompany.slug}" class="bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase py-2.5 px-4 transition-colors flex items-center gap-1.5">
              <span>Ver Mini-Sitio</span>
              <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
            </a>
            <button class="border border-outline-variant hover:border-primary text-primary hover:bg-surface-container font-label-caps text-label-caps uppercase py-2.5 px-3 transition-colors" onclick="window.openQuickWhatsApp('${linkedCompany.contact.whatsapp}', '${linkedCompany.name}')">
              <span class="material-symbols-outlined text-[16px] text-emerald-600">chat</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Social Share Bar at Bottom -->
      <div class="border-t border-outline-variant pt-6 mb-12">
        ${renderSocialShareBar(getLocalized(article, 'title'), window.location.href, ["Querétaro", "B2B", "Nearshoring", "Industria"])}
      </div>

    </div>
  `;
}
