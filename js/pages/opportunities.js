import { opportunitiesData } from '../data/opportunities.js';
import { renderSocialShareBar } from '../components/socialShare.js';
import { t, getLang, getLocalized } from '../i18n.js';

let oppFilter = "all";

export function renderOpportunitiesPage() {
  const lang = getLang();
  const isEs = lang === "es";

  const filteredOpps = opportunitiesData.filter(opp => {
    if (oppFilter === "all") return true;
    if (oppFilter === "rfq") return opp.type === "rfq" || opp.type === "need";
    return opp.type === oppFilter;
  });

  return `
    <div class="animate-fade-in">
      
      <!-- Opportunities Broadsheet Masthead -->
      <div class="border-b border-outline-variant pb-6 mb-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span class="font-mono-data text-mono-data text-secondary uppercase tracking-widest font-semibold block mb-1">
              ${isEs ? "Bolsa de Proveeduría & Mercado Vivo B2B" : "Live B2B Supply & Demand Exchange"}
            </span>
            <h1 class="font-headline-lg text-headline-lg text-primary tracking-tight font-medium uppercase">
              ${isEs ? "Demandas de Compra & Ofertas Industriales" : "Procurement Demands & Industrial Offers"}
            </h1>
            <p class="font-headline-sm text-headline-sm italic text-on-surface-variant mt-1 font-normal max-w-3xl">
              ${isEs ? "Transacciones directas entre empresas compradoras Tier 1/2 y proveedores certificados en Querétaro." : "Direct matchmaking between Tier 1/2 buyers and certified suppliers across Querétaro."}
            </p>
          </div>
          <div class="flex items-center gap-3">
            <button class="bg-secondary text-on-secondary hover:bg-primary font-label-caps text-label-caps uppercase px-5 py-3 transition-colors flex items-center gap-2" onclick="window.openTypeformModal('post-opportunity')">
              <span class="material-symbols-outlined text-[16px]">add_circle</span>
              <span>${isEs ? "Publicar Requerimiento B2B" : "Post B2B Requirement"}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Broadsheet Filter Tabs -->
      <div class="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-outline-variant font-label-caps text-label-caps">
        <button class="px-4 py-2 uppercase tracking-wider transition-colors ${oppFilter === 'all' ? 'bg-primary text-background font-bold' : 'border border-outline-variant text-primary hover:bg-surface-container'}" onclick="window.setOppFilter('all')">
          ${isEs ? "Todas las Oportunidades" : "All Opportunities"} (${opportunitiesData.length})
        </button>
        <button class="px-4 py-2 uppercase tracking-wider transition-colors ${oppFilter === 'rfq' ? 'bg-primary text-background font-bold' : 'border border-outline-variant text-primary hover:bg-surface-container'}" onclick="window.setOppFilter('rfq')">
          ${isEs ? "Demandas RFQ Urgentes" : "Urgent RFQs"}
        </button>
        <button class="px-4 py-2 uppercase tracking-wider transition-colors ${oppFilter === 'offer' ? 'bg-primary text-background font-bold' : 'border border-outline-variant text-primary hover:bg-surface-container'}" onclick="window.setOppFilter('offer')">
          ${isEs ? "Capacidad Disponible & Naves" : "Available Capacity & Facilities"}
        </button>
        <button class="px-4 py-2 uppercase tracking-wider transition-colors ${oppFilter === 'partner' ? 'bg-primary text-background font-bold' : 'border border-outline-variant text-primary hover:bg-surface-container'}" onclick="window.setOppFilter('partner')">
          ${isEs ? "Alianzas & Nearshoring" : "Partnerships & Nearshoring"}
        </button>
      </div>

      <!-- Opportunities Feed Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        ${filteredOpps.map(opp => `
          <div class="border border-outline-variant bg-surface-container-lowest p-5 flex flex-col justify-between hover:border-secondary transition-all">
            <div>
              <!-- Card Top Deck -->
              <div class="flex items-center justify-between mb-3 pb-2 border-b border-outline-variant">
                <span class="${opp.type === 'offer' ? 'bg-primary text-background' : 'bg-secondary text-on-secondary'} px-2 py-0.5 text-[10px] font-mono-data uppercase font-bold tracking-wider">
                  ${opp.typeLabel.toUpperCase()}
                </span>
                <span class="font-mono-data text-mono-data text-on-surface-variant flex items-center gap-1">
                  <span class="material-symbols-outlined text-[14px]">schedule</span>
                  <span>⏳ ${opp.deadline}</span>
                </span>
              </div>

              <!-- Company Meta -->
              <div class="flex items-center gap-3 mb-3">
                <img src="${opp.companyLogo}" alt="${opp.companyName}" class="w-9 h-9 border border-outline-variant object-contain bg-surface-container-low p-0.5" />
                <div>
                  <div class="font-headline-sm text-sm font-semibold text-primary truncate">
                    <a href="#/business/${opp.companyId}" class="hover:text-secondary">${opp.companyName}</a>
                  </div>
                  <div class="font-mono-data text-[11px] text-on-surface-variant">${opp.location}</div>
                </div>
              </div>

              <!-- Title & Desc -->
              <h3 class="font-headline-sm text-headline-sm text-primary mb-2">${getLocalized(opp, 'title')}</h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant mb-4 leading-relaxed">${getLocalized(opp, 'description')}</p>

              <!-- Technical Specs Box -->
              <div class="bg-surface-container-low border-l-2 border-primary p-3 mb-4">
                <div class="font-label-caps text-[10px] text-on-surface-variant uppercase font-bold mb-1">Especificaciones Clave:</div>
                <ul class="font-mono-data text-xs text-primary space-y-1">
                  ${opp.requirements.map(r => `<li>• ${r}</li>`).join('')}
                </ul>
              </div>
            </div>

            <!-- Footer Strip & Action -->
            <div class="pt-3 border-t border-outline-variant flex items-center justify-between">
              <div>
                <div class="font-mono-data text-[10px] uppercase text-on-surface-variant">Valor Estimado</div>
                <div class="font-mono-metric text-base font-bold text-secondary">${opp.budget}</div>
              </div>
              <button class="bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase py-2 px-4 transition-colors flex items-center gap-1.5" onclick="window.openTypeformModal('rfq', { companyId: '${opp.companyId}' })">
                <span>Postularse</span>
                <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;
}

window.setOppFilter = function(filter) {
  oppFilter = filter;
  const appContainer = document.getElementById("app-main");
  if (appContainer) {
    appContainer.innerHTML = renderOpportunitiesPage();
  }
};
