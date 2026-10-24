import { industriesData } from '../data/industries.js';
import { companiesData } from '../data/companies.js';
import { renderBusinessCard } from '../components/businessCard.js';
import { t, getLang, getLocalized } from '../i18n.js';

export function renderIndustryPage(slug) {
  const lang = getLang();
  const isEs = lang === "es";
  const industry = industriesData.find(i => i.slug === slug) || industriesData[0];
  const clusterCompanies = companiesData.filter(c => c.industryId === industry.id);

  return `
    <div class="animate-fade-in">
      
      <!-- Industry Broadsheet Top Navigation -->
      <div class="border-b border-outline-variant pb-4 mb-6 flex items-center justify-between font-mono-data text-mono-data">
        <a href="#/" class="text-secondary hover:underline flex items-center gap-1 font-bold">
          <span class="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>${isEs ? "Volver a Inicio / Ecosistemas" : "Back to Home / Ecosystems"}</span>
        </a>
        <span class="bg-surface-container px-2.5 py-0.5 text-[11px] font-label-caps uppercase border-l-2 border-secondary font-bold">
          ${industry.clusterCode}
        </span>
      </div>

      <!-- Industry Hero Spread -->
      <section class="border border-outline-variant bg-surface-container-lowest mb-8 shadow-sm">
        <div class="grid grid-cols-1 lg:grid-cols-12 min-h-[400px]">
          
          <div class="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-outline-variant">
            <div>
              <span class="font-mono-data text-mono-data text-secondary uppercase font-bold tracking-widest block mb-1">
                ${industry.clusterCode} · ${industry.countLabel}
              </span>

              <h1 class="font-headline-lg text-3xl sm:text-4xl text-primary tracking-tight font-medium mb-3">
                ${getLocalized(industry, 'name')}
              </h1>

              <p class="font-body-md text-body-md text-on-surface-variant mb-4 leading-relaxed">
                ${getLocalized(industry, 'tagline')}
              </p>

              <blockquote class="border-l-2 border-secondary pl-4 italic font-headline-md text-base sm:text-lg text-primary my-3">
                «${getLocalized(industry, 'description')}»
              </blockquote>
            </div>

            <div>
              <!-- Stat Metrics Strip -->
              <div class="grid grid-cols-3 gap-3 pt-4 border-t border-outline-variant bg-surface-container-low p-3.5 mb-5 font-mono-data text-xs">
                ${industry.stats.map(s => `
                  <div>
                    <div class="text-on-surface-variant">${getLocalized(s, 'label')}</div>
                    <div class="font-mono-metric text-lg font-bold text-secondary mt-0.5">${s.value}</div>
                  </div>
                `).join('')}
              </div>

              <!-- Main Actions -->
              <div class="flex items-center gap-3">
                <button class="bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase py-3 px-6 transition-colors flex items-center gap-2" onclick="window.openTypeformModal('matchmaker', { sector: '${industry.id}' })">
                  <span class="material-symbols-outlined text-[16px]">support_agent</span>
                  <span>${isEs ? "Consultar Concierge para este Clúster" : "Consult Concierge for Cluster"}</span>
                </button>
                <button class="border border-outline-variant hover:border-primary text-primary hover:bg-surface-container font-label-caps text-label-caps uppercase py-3 px-4 text-center transition-colors" onclick="window.openTypeformModal('post-opportunity')">
                  Publicar Requerimiento RFQ
                </button>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 relative flex flex-col justify-end min-h-[280px] lg:min-h-full overflow-hidden bg-primary-container">
            <img src="${industry.image}" alt="${industry.name}" class="absolute inset-0 w-full h-full object-cover filter contrast-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent"></div>
            <div class="relative z-10 p-6 text-surface-bright">
              <div class="font-mono-data text-xs text-secondary font-bold uppercase mb-1">Parques & Corredores Principales:</div>
              <p class="font-mono-data text-xs text-outline-variant">${industry.parks.join(' · ')}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Clúster Companies Directory -->
      <div class="mb-10">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-2 border-b border-outline-variant">
          <div>
            <span class="font-mono-data text-mono-data text-secondary uppercase tracking-widest font-semibold block mb-1">
              Directorio Homologado
            </span>
            <h3 class="font-headline-md text-headline-md text-primary tracking-tight font-medium">
              Empresas y Proveedores de ${getLocalized(industry, 'name')}
            </h3>
          </div>
          <p class="font-mono-data text-mono-data text-on-surface-variant">
            ${clusterCompanies.length} Empresas Auditadas
          </p>
        </div>

        ${clusterCompanies.length > 0 ? `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            ${clusterCompanies.map(c => renderBusinessCard(c)).join('')}
          </div>
        ` : `
          <div class="border border-outline-variant bg-surface-container-lowest p-8 text-center">
            <p class="font-body-md text-on-surface-variant">Actualmente se están homologando más plantas para este sector.</p>
          </div>
        `}
      </div>

    </div>
  `;
}
