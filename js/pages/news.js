import { newsData } from '../data/news.js';
import { t, getLang, getLocalized } from '../i18n.js';

export function renderNewsPage() {
  const lang = getLang();
  const isEs = lang === "es";

  return `
    <div class="animate-fade-in">
      
      <!-- Editorial News Broadsheet Masthead -->
      <div class="border-b border-outline-variant pb-6 mb-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span class="font-mono-data text-mono-data text-secondary uppercase tracking-widest font-semibold block mb-1">
              ${isEs ? "Crónica & Periodismo Económico Industrial del Bajío" : "Economic & Industrial Journalism"}
            </span>
            <h1 class="font-headline-lg text-headline-lg text-primary tracking-tight font-medium uppercase">
              ${isEs ? "Crónicas, Inteligencia & Noticias B2B" : "B2B Intelligence & Regional Insights"}
            </h1>
            <p class="font-headline-sm text-headline-sm italic text-on-surface-variant mt-1 font-normal max-w-3xl">
              ${isEs ? "Investigaciones exclusivas sobre nearshoring, inversiones de capital, cadenas de suministro aeroespacial y automotriz, y perfiles de directores generales." : "Exclusive investigations on nearshoring, capital investments, aerospace and automotive supply chains, and C-level profiles."}
            </p>
          </div>
          <div class="flex items-center gap-3">
            <span class="bg-surface-container text-primary font-mono-data text-xs px-3 py-1.5 border border-outline-variant">
              Edición Trimestral No. 142
            </span>
          </div>
        </div>
      </div>

      <!-- Lead Article Feature (Frontpage Broadsheet Spread) -->
      <section class="border border-outline-variant bg-surface-container-lowest mb-10 shadow-sm">
        <div class="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          <div class="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-outline-variant">
            <div>
              <div class="flex items-center gap-2 mb-3">
                <span class="bg-secondary text-on-secondary text-[11px] font-label-caps uppercase px-2.5 py-0.5 font-bold">
                  PORTADA EDITORIAL
                </span>
                <span class="bg-surface-container text-primary text-[11px] font-label-caps uppercase px-2 py-0.5 font-bold border-l-2 border-primary">
                  ${getLocalized(newsData[0], 'category')}
                </span>
                <span class="bg-surface-container text-primary text-[11px] font-label-caps uppercase px-2 py-0.5 font-bold border-l-2 border-tertiary-container">
                  Primicia Bajío
                </span>
              </div>
              <span class="font-mono-data text-mono-data text-secondary uppercase font-bold tracking-widest block mb-1">
                CRÓNICA FINANCIERA ESPECIAL · CAPÍTULO QUERÉTARO
              </span>
              <h2 class="font-headline-lg text-3xl sm:text-4xl text-primary tracking-tight font-medium mb-3 leading-tight">
                <a href="#/article/${newsData[0].slug}" class="hover:text-secondary transition-colors">
                  ${getLocalized(newsData[0], 'title')}
                </a>
              </h2>
              <p class="font-body-md text-body-md text-on-surface-variant mb-4 leading-relaxed">
                ${getLocalized(newsData[0], 'subtitle')}
              </p>
              <blockquote class="border-l-2 border-secondary pl-4 italic font-headline-md text-lg text-primary my-3">
                «${newsData[0].highlightQuote || "El corredor industrial de Querétaro lidera la conversión tecnológica del T-MEC para sustitución de insumos asiáticos."}»
              </blockquote>
            </div>
            
            <div class="pt-4 border-t border-outline-variant flex items-center justify-between flex-wrap gap-4">
              <div class="flex items-center gap-3">
                <img src="${newsData[0].author.avatar}" alt="${newsData[0].author.name}" class="w-10 h-10 border border-outline-variant object-cover" />
                <div>
                  <div class="font-headline-sm text-sm text-primary font-bold">${newsData[0].author.name}</div>
                  <div class="font-mono-data text-[11px] text-on-surface-variant">${newsData[0].publishedDate} · ${getLocalized(newsData[0], 'readTime')}</div>
                </div>
              </div>
              <a href="#/article/${newsData[0].slug}" class="bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase py-2.5 px-5 transition-colors flex items-center gap-2">
                <span>Leer Crónica Completa</span>
                <span class="material-symbols-outlined text-[16px]">menu_book</span>
              </a>
            </div>
          </div>

          <div class="lg:col-span-5 relative flex flex-col justify-end min-h-[300px] lg:min-h-full overflow-hidden bg-primary-container">
            <img src="${newsData[0].heroImage}" alt="${newsData[0].title}" class="absolute inset-0 w-full h-full object-cover filter contrast-110 brightness-95" />
            <div class="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent"></div>
            <div class="relative z-10 p-6 text-surface-bright">
              <div class="flex items-center gap-2 mb-2">
                <span class="bg-secondary text-on-secondary text-[10px] font-mono-data font-bold uppercase px-2 py-0.5">Reportaje Especial</span>
                <span class="font-mono-data text-mono-data text-surface-variant">Corredor Tecnológico Colón</span>
              </div>
              <p class="font-mono-data text-xs text-outline-variant">
                Fotografía documental de plantas industriales en Querétaro.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Article Grid -->
      <div class="flex items-center justify-between mb-6 pb-2 border-b border-outline-variant">
        <h3 class="font-headline-md text-headline-md text-primary font-medium">
          ${isEs ? "Artículos Recientes & Análisis Sectoriales" : "Recent Articles & Sector Analysis"}
        </h3>
        <span class="font-mono-data text-mono-data text-on-surface-variant">${newsData.length} Crónicas Publicadas</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        ${newsData.slice(1).map((article, idx) => `
          <article class="border border-outline-variant bg-surface-container-lowest p-5 flex flex-col justify-between hover:border-secondary transition-all">
            <div>
              <div class="relative h-48 overflow-hidden mb-4 border border-outline-variant bg-primary-container">
                <img src="${article.heroImage}" alt="${article.title}" class="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300" />
                <span class="absolute top-2 left-2 bg-primary text-background text-[10px] font-mono-data uppercase px-2 py-0.5">
                  ${getLocalized(article, 'category')}
                </span>
              </div>
              <div class="flex items-center justify-between font-mono-data text-xs text-secondary mb-1">
                <span>#0${idx + 2} · ${article.publishedDate}</span>
                <span class="text-on-surface-variant font-mono-data text-[11px]">${getLocalized(article, 'readTime')}</span>
              </div>
              <h4 class="font-headline-sm text-lg text-primary mb-2 leading-snug">
                <a href="#/article/${article.slug}" class="hover:text-secondary">${getLocalized(article, 'title')}</a>
              </h4>
              <p class="font-body-sm text-body-sm text-on-surface-variant mb-4 leading-relaxed">${getLocalized(article, 'summary')}</p>
            </div>
            <div class="pt-3 border-t border-outline-variant flex items-center justify-between font-mono-data text-xs text-on-surface-variant">
              <span>Por ${article.author.name}</span>
              <a href="#/article/${article.slug}" class="text-primary hover:text-secondary font-bold flex items-center gap-1">
                Leer →
              </a>
            </div>
          </article>
        `).join('')}
      </div>

    </div>
  `;
}
