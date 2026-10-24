import { t, getLocalized, getLang } from '../i18n.js';

export function renderBusinessCard(company, options = {}) {
  const lang = getLang();
  const isEs = lang === 'es';
  const positioning = getLocalized(company.positioning, 'oneLiner') || getLocalized(company, 'shortDesc');
  const industryName = getLocalized(company, 'industryName');

  const layer = company.layer || "industrial";
  let layerBadge = "";
  let layerColor = "border-secondary";
  let actionText = isEs ? "Ver Mini-Sitio" : "View Mini-Site";

  if (layer === "industrial") {
    layerBadge = `<span class="bg-primary text-surface-bright text-[9px] font-mono-data font-bold uppercase px-2 py-0.5 tracking-wider">${isEs ? "01 · INDUSTRIA" : "01 · INDUSTRIAL"}</span>`;
    layerColor = "border-secondary";
    actionText = isEs ? "Expediente Técnico" : "Technical File";
  } else if (layer === "services") {
    layerBadge = `<span class="bg-secondary text-on-secondary text-[9px] font-mono-data font-bold uppercase px-2 py-0.5 tracking-wider">${isEs ? "02 · SERVICIOS B2B" : "02 · B2B SERVICES"}</span>`;
    layerColor = "border-primary";
    actionText = isEs ? "Consultoría & Servicios" : "Advisory Services";
  } else if (layer === "amenities") {
    layerBadge = `<span class="bg-tertiary-container text-tertiary-fixed text-[9px] font-mono-data font-bold uppercase px-2 py-0.5 tracking-wider">${isEs ? "03 · AMENIDAD DE PARQUE" : "03 · PARK AMENITY"}</span>`;
    layerColor = "border-emerald-700";
    actionText = isEs ? "Ver Servicios & Menú" : "View Amenities & Menu";
  }

  // Layer-specific operational metrics pill
  let operationalPill = "";
  if (layer === "industrial" && company.guaranteedTolerance) {
    operationalPill = `<span class="text-[11px] font-mono-data text-secondary font-bold">Tol: ${company.guaranteedTolerance}</span>`;
  } else if (layer === "services" && company.responseTime) {
    operationalPill = `<span class="text-[11px] font-mono-data text-secondary font-bold">SLA: ${company.responseTime}</span>`;
  } else if (layer === "amenities" && company.operatingHours) {
    operationalPill = `<span class="text-[11px] font-mono-data text-emerald-800 font-bold">${company.operatingHours.split('(')[0].trim()}</span>`;
  }

  return `
    <div class="border border-outline-variant bg-surface-container-lowest p-5 flex flex-col justify-between hover:border-secondary transition-all" data-company-id="${company.id}" data-industry="${company.industryId}" data-layer="${layer}">
      <div>
        <!-- Card Top Image / Media Framing -->
        <div class="relative h-48 overflow-hidden mb-4 border border-outline-variant bg-primary-container">
          <img src="${company.coverImage}" alt="${company.name}" class="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 hover:scale-105 transition-all duration-300" loading="lazy" />
          <div class="absolute top-2 left-2 flex flex-wrap gap-1.5">
            ${layerBadge}
            ${company.verified ? `
              <span class="bg-surface-container-lowest text-primary text-[9px] font-mono-data font-bold uppercase px-2 py-0.5 border border-outline-variant">
                ✓ VERIFICADO
              </span>
            ` : ''}
            <span class="bg-primary/80 text-surface-bright text-[9px] font-mono-data font-bold uppercase px-2 py-0.5">
              ${company.zone}
            </span>
          </div>
          <div class="absolute bottom-2 right-2 bg-surface-container-lowest p-1 border border-outline-variant">
            <img src="${company.logo}" alt="${company.name} Logo" class="h-6 w-auto object-contain" />
          </div>
        </div>

        <!-- Meta Kickers -->
        <div class="flex items-center justify-between font-mono-data text-mono-data text-secondary mb-1">
          <span class="uppercase font-semibold truncate mr-2">${industryName}</span>
          ${operationalPill || `<span class="text-on-surface-variant text-[11px]">${company.foundedYear ? `Est. ${company.foundedYear}` : ''}</span>`}
        </div>

        <!-- Title -->
        <h3 class="font-headline-sm text-headline-sm text-primary mb-1">
          <a href="#/business/${company.slug}" class="hover:text-secondary transition-colors">${company.name}</a>
        </h3>

        <!-- Description -->
        <p class="font-body-sm text-body-sm text-on-surface-variant mb-4 line-clamp-2">
          ${positioning}
        </p>

        <!-- Location strip -->
        <div class="flex items-center gap-1.5 font-mono-data text-[12px] text-on-surface-variant mb-4">
          <span class="material-symbols-outlined text-[15px] text-outline">location_on</span>
          <span class="truncate">${company.location}</span>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-1.5 mb-5">
          ${(company.tags || []).slice(0, 3).map(tag => `
            <span class="bg-surface-container-low text-primary text-[10px] font-mono-data px-2 py-0.5 border border-outline-variant">
              ${tag}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Action Buttons Deck -->
      <div class="pt-4 border-t border-outline-variant flex items-center gap-2">
        <a href="#/business/${company.slug}" class="flex-1 bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase py-2.5 px-3 text-center transition-colors flex items-center justify-center gap-1.5">
          <span>${actionText}</span>
          <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
        </a>
        <button onclick="window.openQuickWhatsApp('${company.contact.whatsapp}', '${company.name}')" class="p-2.5 border border-outline-variant hover:border-primary text-primary hover:bg-surface-container transition-colors" title="WhatsApp Directo">
          <span class="material-symbols-outlined text-[16px] text-emerald-600">chat</span>
        </button>
        <button onclick="window.openTypeformModal('rfq', { companyId: '${company.id}' })" class="p-2.5 border border-outline-variant hover:border-secondary text-primary hover:bg-secondary hover:text-on-secondary transition-colors" title="${layer === 'amenities' ? (isEs ? 'Reservar / Solicitar Servicio' : 'Book / Request Service') : (isEs ? 'Solicitar Cotización / Propuesta' : 'Request Quote / RFP')}">
          <span class="material-symbols-outlined text-[16px]">${layer === 'amenities' ? 'event' : 'send'}</span>
        </button>
      </div>
    </div>
  `;
}

window.openQuickWhatsApp = function(whatsappNumber, companyName) {
  const lang = getLang();
  const text = encodeURIComponent(
    lang === 'es'
      ? `Hola ${companyName}, descubrí su perfil en Red Empresarial QRO B2B y me gustaría solicitar información y cotización.`
      : `Hello ${companyName}, I discovered your profile on Red Empresarial QRO B2B and would like to inquire about your services and request a quote.`
  );
  window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
};
