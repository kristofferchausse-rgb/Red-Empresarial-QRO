import { companiesData } from '../data/companies.js';
import { renderSocialShareBar } from '../components/socialShare.js';
import { renderBusinessCard } from '../components/businessCard.js';
import { t, getLang, getLocalized } from '../i18n.js';

let activeProfileTab = "default";
let rfqModalData = {
  service: "",
  volume: "",
  specs: "",
  name: "",
  company: "",
  email: "",
  whatsapp: ""
};

// Simulation State for 3D Canvas (Only active for Industrial variant)
let animFrameId = null;
let rotationAngle = 0;
let isWireframeRotating = true;

export function renderBusinessProfilePage(slug) {
  const lang = getLang();
  const isEs = lang === "es";
  const company = companiesData.find(c => c.slug === slug) || companiesData[0];
  const layer = company.layer || company.profileType || "industrial";
  const relatedCompanies = companiesData.filter(c => (c.layer === layer || c.industryId === company.industryId) && c.id !== company.id).slice(0, 3);

  // Set default active tab based on profile variant
  const validTabsByLayer = {
    industrial: ['portfolio', 'matrix', 'machinery', 'logistics', 'cases'],
    services: ['services', 'accreditations', 'cases', 'team'],
    amenities: ['menu', 'facilities', 'agreements', 'hygiene']
  };

  const allowedTabs = validTabsByLayer[layer] || validTabsByLayer.industrial;
  if (!allowedTabs.includes(activeProfileTab)) {
    activeProfileTab = allowedTabs[0];
  }

  // Auto-init 3D wireframe canvas only if industrial profile
  if (layer === "industrial") {
    setTimeout(() => {
      initWireframeCanvas();
    }, 120);
  } else {
    if (animFrameId) cancelAnimationFrame(animFrameId);
  }

  // Layer labels & badges
  let layerBadge = "";
  let layerTitle = "";
  if (layer === "industrial") {
    layerBadge = `<span class="bg-primary text-surface-bright text-[11px] font-label-caps uppercase px-2.5 py-0.5 font-bold tracking-wider">${isEs ? "01 · INDUSTRIA & MANUFACTURA" : "01 · INDUSTRIAL & SUPPLY CHAIN"}</span>`;
    layerTitle = isEs ? "Expediente Técnico de Planta" : "Industrial Plant Technical Dossier";
  } else if (layer === "services") {
    layerBadge = `<span class="bg-secondary text-on-secondary text-[11px] font-label-caps uppercase px-2.5 py-0.5 font-bold tracking-wider">${isEs ? "02 · SERVICIOS B2B & CONSULTORÍA" : "02 · B2B PROFESSIONAL SERVICES"}</span>`;
    layerTitle = isEs ? "Expediente de Servicios & Consultoría Especializada" : "Specialized Advisory & Services Dossier";
  } else if (layer === "amenities") {
    layerBadge = `<span class="bg-tertiary-container text-tertiary-fixed text-[11px] font-label-caps uppercase px-2.5 py-0.5 font-bold tracking-wider">${isEs ? "03 · SERVICIO DE PARQUE & AMENIDAD" : "03 · PARK SERVICES & AMENITIES"}</span>`;
    layerTitle = isEs ? "Expediente de Servicio de Parque & Calidad de Vida" : "Park Amenities & Corporate Life Dossier";
  }

  return `
    <div class="animate-fade-in">
      
      <!-- Broadsheet Breadcrumb & Quick Deck -->
      <div class="border-b border-outline-variant pb-4 mb-6 flex flex-wrap items-center justify-between gap-4 font-mono-data text-mono-data">
        <div class="flex items-center gap-2 text-on-surface-variant text-xs sm:text-sm">
          <a href="#/" class="hover:text-primary">Red Empresarial QRO</a>
          <span>/</span>
          <a href="#/directory" class="hover:text-primary">${isEs ? "Directorio" : "Directory"}</a>
          <span>/</span>
          <a href="#/directory?layer=${layer}" class="text-secondary font-semibold uppercase hover:underline">
            ${layer === 'industrial' ? (isEs ? "Industria" : "Industrial") : layer === 'services' ? (isEs ? "Servicios B2B" : "Business Services") : (isEs ? "Amenidades" : "Amenities")}
          </a>
          <span>/</span>
          <span class="text-primary font-bold truncate max-w-[200px] sm:max-w-none">${company.name}</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="bg-surface-container text-primary text-[11px] font-label-caps uppercase px-2.5 py-0.5 font-bold border-l-2 border-secondary">
            ${isEs ? "Registro" : "ID"} No. ${company.supplierId || company.id.substring(0, 6).toUpperCase()}
          </span>
          <span class="text-outline-variant">|</span>
          <span class="text-emerald-700 font-mono-data text-xs flex items-center gap-1 font-bold">
            <span class="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            ${isEs ? "Auditoría Vigente 2026" : "Verified 2026"}
          </span>
        </div>
      </div>

      <!-- HERO SPREAD: MONOCLE STYLE COMPANY SHOWCASE & INTERACTIVE PHOTO GALLERY -->
      <section class="border border-outline-variant bg-surface-container-lowest mb-8 shadow-sm">
        <div class="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
          
          <!-- Narrative & Title Left Panel (7 Cols) -->
          <div class="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-outline-variant">
            <div>
              <div class="flex flex-wrap items-center gap-2 mb-3">
                ${layerBadge}
                ${company.verified ? `
                  <span class="bg-surface-container-low text-primary text-[11px] font-label-caps uppercase px-2.5 py-0.5 font-bold border border-outline-variant">
                    ✓ HOMOLOGADO
                  </span>
                ` : ''}
                <span class="bg-surface-container text-primary text-[11px] font-label-caps uppercase px-2 py-0.5 font-bold border-l-2 border-primary">
                  ${company.zone}
                </span>
                <span class="bg-surface-container text-primary text-[11px] font-label-caps uppercase px-2 py-0.5 font-bold border-l-2 border-secondary">
                  ${company.foundedYear ? `Est. ${company.foundedYear}` : (isEs ? 'Operación Activa' : 'Active Operation')}
                </span>
              </div>

              <span class="font-mono-data text-mono-data text-secondary uppercase font-bold tracking-widest block mb-1">
                ${getLocalized(company, 'industryName')} · ${layerTitle}
              </span>

              <h1 class="font-headline-lg text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight font-medium mb-3">
                ${company.name}
              </h1>

              <p class="font-mono-data text-mono-data text-on-surface-variant mb-4 text-xs sm:text-sm">
                <span class="material-symbols-outlined text-[15px] align-middle mr-1 text-secondary">location_on</span>
                ${company.location}
              </p>

              <blockquote class="border-l-2 border-secondary pl-5 my-4 italic font-headline-md text-base sm:text-lg text-primary leading-snug">
                «${getLocalized(company.positioning, 'oneLiner')}»
                <footer class="font-body-sm text-body-sm text-on-surface-variant not-italic mt-2 font-medium">
                  — ${company.contact.director}, ${getLocalized(company.contact, 'title')}
                </footer>
              </blockquote>
            </div>

            <!-- MODULAR KEY OPERATIONAL METRICS STRIP -->
            <div>
              ${renderHeroMetricsStrip(company, layer, isEs)}

              <!-- Main Direct Action Buttons Deck -->
              <div class="flex flex-wrap items-center gap-3">
                <button class="bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase px-5 py-3 transition-colors flex items-center gap-2" onclick="window.openLandingRfqModal('${company.name}', '${company.contact.whatsapp}', '${company.layer === 'amenities' ? 'Reservación / Pedido de Servicio' : company.layer === 'services' ? 'Solicitud de Asesoría / RFP' : 'Cotización Técnica RFQ'}')">
                  <span class="material-symbols-outlined text-[16px]">${company.layer === 'amenities' ? 'event' : 'send'}</span>
                  <span>${company.layer === 'amenities' ? (isEs ? 'Reservar / Solicitar Servicio' : 'Book / Order Service') : company.layer === 'services' ? (isEs ? 'Solicitar Asesoría / RFP' : 'Request Advisory / RFP') : (isEs ? 'Solicitar Cotización RFQ' : 'Request Technical RFQ')}</span>
                </button>
                <button class="border border-outline-variant bg-surface-container-lowest text-primary hover:border-emerald-700 hover:text-emerald-800 font-label-caps text-label-caps uppercase px-4 py-3 transition-colors flex items-center gap-2" onclick="window.openProfileWhatsApp('${company.contact.whatsapp}', '${company.name}', '${company.contact.director}')">
                  <span class="material-symbols-outlined text-[18px] text-emerald-600">chat</span>
                  <span>WhatsApp con Director</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Media Showcase & Gallery Right Panel (5 Cols) -->
          <div class="lg:col-span-5 bg-surface-container-low flex flex-col justify-between">
            <div class="relative h-64 sm:h-72 lg:h-80 overflow-hidden border-b border-outline-variant bg-primary-container">
              <img id="mainGalleryImage" src="${company.coverImage}" alt="${company.name}" class="w-full h-full object-cover filter contrast-115 transition-all duration-300" />
              <div class="absolute bottom-3 right-3 bg-surface-container-lowest p-2 border border-outline-variant flex items-center gap-2 shadow-sm">
                <img src="${company.logo}" alt="${company.name} Logo" class="h-8 w-auto object-contain" />
              </div>
            </div>

            <!-- Thumbnail Selector Gallery -->
            <div class="p-4 bg-surface-container-lowest">
              <span class="font-mono-data text-xs text-on-surface-variant uppercase tracking-wider block mb-2 font-semibold">
                ${isEs ? "Galería de Instalaciones & Operaciones:" : "Facility & Operations Gallery:"}
              </span>
              <div class="grid grid-cols-4 gap-2">
                ${(company.gallery || []).map((imgObj, i) => `
                  <button class="relative h-16 border border-outline-variant overflow-hidden hover:border-secondary focus:outline-none transition-all group" onclick="window.switchMainGalleryImage('${imgObj.image}')">
                    <img src="${imgObj.image}" alt="${imgObj.title}" class="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-200" />
                  </button>
                `).join('')}
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- MODULAR INTERACTIVE SECTION BY LAYER -->
      ${renderInteractiveLayerSection(company, layer, isEs)}

      <!-- MODULAR 4 OR 5 TAB DOSSIER BY LAYER -->
      ${renderModularDossier(company, layer, isEs)}

      <!-- RELATED BUSINESSES WITHIN SAME LAYER / ECOSYSTEM -->
      <section class="border-t border-outline-variant pt-8 mt-12 mb-8">
        <div class="flex items-center justify-between mb-6 pb-2 border-b border-outline-variant">
          <div>
            <span class="font-mono-data text-xs text-secondary font-bold uppercase tracking-widest block mb-1">
              ${isEs ? "VINCULACIÓN INDUSTRIAL EN EL CORREDOR" : "REGIONAL NETWORK MATCHING"}
            </span>
            <h3 class="font-headline-md text-2xl text-primary font-medium">
              ${isEs ? "Otras Empresas y Servicios en Querétaro" : "Other Verified Businesses in Querétaro"}
            </h3>
          </div>
          <a href="#/directory" class="text-secondary hover:underline font-mono-data text-xs font-bold flex items-center gap-1">
            <span>${isEs ? "Ver Todo el Directorio" : "View Complete Directory"}</span>
            <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
          </a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          ${relatedCompanies.map(c => renderBusinessCard(c)).join('')}
        </div>
      </section>

      <!-- SOCIAL SHARE BAR -->
      <div class="border-t border-outline-variant pt-6 mb-10 flex flex-wrap items-center justify-between gap-4 font-mono-data text-xs text-on-surface-variant">
        <div>
          <span>${isEs ? "Ficha técnica homologada por" : "Verified record by"} <strong>Red Empresarial QRO B2B</strong></span>
        </div>
        <div>
          ${renderSocialShareBar({ title: company.name, text: `${company.name} en Red Empresarial QRO B2B`, url: window.location.href })}
        </div>
      </div>

      <!-- SLIDE-OVER RFQ / CONSULTATION / RESERVATION MODAL -->
      ${renderModularInquiryDrawer(company, layer, isEs)}

    </div>
  `;
}

// -------------------------------------------------------------
// 1. HERO METRICS STRIP RENDERER (Layer-tailored)
// -------------------------------------------------------------
function renderHeroMetricsStrip(company, layer, isEs) {
  if (layer === "industrial") {
    return `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-4 border-t border-outline-variant bg-surface-container-low p-3.5 mb-5">
        <div>
          <div class="font-mono-metric text-base sm:text-mono-metric font-bold text-primary">${company.surfaceM2 || "14,000 m²"}</div>
          <div class="font-mono-data text-mono-data text-on-surface-variant mt-0.5 text-[11px]">${isEs ? "Superficie Nave" : "Plant Area"}</div>
        </div>
        <div>
          <div class="font-mono-metric text-base sm:text-mono-metric font-bold text-secondary">${company.otdRate || "99.8%"}</div>
          <div class="font-mono-data text-mono-data text-on-surface-variant mt-0.5 text-[11px]">${isEs ? "Puntualidad OTD" : "On-Time Delivery"}</div>
        </div>
        <div>
          <div class="font-mono-metric text-base sm:text-mono-metric font-bold text-primary">${company.ppmRejection || "0 PPM"}</div>
          <div class="font-mono-data text-mono-data text-on-surface-variant mt-0.5 text-[11px]">${isEs ? "Rechazo de Calidad" : "PPM Rejection"}</div>
        </div>
        <div>
          <div class="font-mono-metric text-base sm:text-mono-metric font-bold text-primary">${company.guaranteedTolerance || "± 0.003 mm"}</div>
          <div class="font-mono-data text-mono-data text-on-surface-variant mt-0.5 text-[11px]">${isEs ? "Tolerancia Límite" : "Tolerance Limit"}</div>
        </div>
      </div>
    `;
  } else if (layer === "services") {
    return `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-4 border-t border-outline-variant bg-surface-container-low p-3.5 mb-5">
        <div>
          <div class="font-mono-metric text-base sm:text-mono-metric font-bold text-primary">${company.successRate || "99.4%"}</div>
          <div class="font-mono-data text-mono-data text-on-surface-variant mt-0.5 text-[11px]">${isEs ? "Éxito en Auditorías" : "Audit Success Rate"}</div>
        </div>
        <div>
          <div class="font-mono-metric text-base sm:text-mono-metric font-bold text-secondary">${company.responseTime || "< 15 min"}</div>
          <div class="font-mono-data text-mono-data text-on-surface-variant mt-0.5 text-[11px]">${isEs ? "Tiempo SLA Urgencias" : "Urgency SLA Time"}</div>
        </div>
        <div>
          <div class="font-mono-metric text-base sm:text-mono-metric font-bold text-primary">${company.clientsServed || "45+ Plantas"}</div>
          <div class="font-mono-data text-mono-data text-on-surface-variant mt-0.5 text-[11px]">${isEs ? "Plantas Asesoradas" : "Client Facilities"}</div>
        </div>
        <div>
          <div class="font-mono-metric text-base sm:text-mono-metric font-bold text-primary">${company.staffCredential || "100% Titulados"}</div>
          <div class="font-mono-data text-mono-data text-on-surface-variant mt-0.5 text-[11px]">${isEs ? "Acreditación Oficial" : "Official Credential"}</div>
        </div>
      </div>
    `;
  } else if (layer === "amenities") {
    return `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-4 border-t border-outline-variant bg-surface-container-low p-3.5 mb-5">
        <div>
          <div class="font-mono-metric text-base sm:text-mono-metric font-bold text-primary">${company.operatingHours ? company.operatingHours.split('(')[0].trim() : "24/7"}</div>
          <div class="font-mono-data text-mono-data text-on-surface-variant mt-0.5 text-[11px]">${isEs ? "Horario de Servicio" : "Operating Hours"}</div>
        </div>
        <div>
          <div class="font-mono-metric text-base sm:text-mono-metric font-bold text-secondary">${company.distanceToPlants || "< 3 min"}</div>
          <div class="font-mono-data text-mono-data text-on-surface-variant mt-0.5 text-[11px]">${isEs ? "Distancia en Parque" : "Park Proximity"}</div>
        </div>
        <div>
          <div class="font-mono-metric text-base sm:text-mono-metric font-bold text-primary">${company.corporatePerks || "Descuento Gafete"}</div>
          <div class="font-mono-data text-mono-data text-on-surface-variant mt-0.5 text-[11px]">${isEs ? "Convenio Empresas" : "Corporate Perks"}</div>
        </div>
        <div>
          <div class="font-mono-metric text-base sm:text-mono-metric font-bold text-emerald-800">${company.capacity ? company.capacity.split('+')[0].trim() : "Alta Capacidad"}</div>
          <div class="font-mono-data text-mono-data text-on-surface-variant mt-0.5 text-[11px]">${isEs ? "Capacidad Instalada" : "Installed Capacity"}</div>
        </div>
      </div>
    `;
  }
}

// -------------------------------------------------------------
// 2. MODULAR INTERACTIVE SECTION BY LAYER
// -------------------------------------------------------------
function renderInteractiveLayerSection(company, layer, isEs) {
  if (layer === "industrial") {
    // 3D CAD Wireframe Inspection (Only for Industrial)
    return `
      <section class="border border-outline-variant bg-surface-container-lowest mb-8 shadow-sm">
        <div class="p-4 sm:p-5 border-b border-outline-variant bg-surface-container-low flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="font-mono-data text-xs text-secondary font-bold uppercase tracking-wider">VISUALIZADOR TÉCNICO CAD & CONTROL DE CALIDAD</div>
            <h3 class="font-headline-sm text-lg text-primary font-bold">Simulación 3D de Geometría & Puntos de Inspección FAI AS9102</h3>
          </div>
          <div class="flex items-center gap-2">
            <button class="border border-outline-variant bg-surface-container-lowest text-primary text-xs font-mono-data px-3 py-1.5 hover:border-primary flex items-center gap-1.5" onclick="window.toggleWireframeRotation()">
              <span class="material-symbols-outlined text-[14px]">sync</span>
              <span id="rotationBtnText">Pausar Rotación</span>
            </button>
            <button class="bg-primary text-surface-bright text-xs font-mono-data px-3 py-1.5 hover:bg-secondary flex items-center gap-1.5" onclick="window.resetWireframeView()">
              <span class="material-symbols-outlined text-[14px]">refresh</span>
              <span>Centrar Vista</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 min-h-[320px]">
          <!-- 3D Canvas Area (8 cols) -->
          <div class="lg:col-span-8 relative bg-zinc-950 flex items-center justify-center p-4 overflow-hidden border-b lg:border-b-0 lg:border-r border-outline-variant">
            <canvas id="wireframeCadCanvas" width="600" height="300" class="w-full h-full max-h-[320px] cursor-grab active:cursor-grabbing"></canvas>
            
            <div class="absolute top-4 left-4 font-mono-data text-[11px] text-zinc-400 space-y-1 bg-black/60 p-2.5 border border-zinc-800 backdrop-blur-sm">
              <div class="text-secondary font-bold">DATUM PLANES [A|B|C]</div>
              <div>Datum A: Superficie Base (Perpendicularidad 0.002 mm)</div>
              <div>Datum B: Eje de Coaxialidad (Ø 45.000 +0.005 / -0.000)</div>
              <div>Inspección: Zeiss Prismo CMM @ 20.0°C ± 0.1°C</div>
            </div>

            <div class="absolute bottom-4 right-4 font-mono-data text-[10px] text-zinc-500 bg-black/70 px-2 py-1 border border-zinc-800">
              Arrastre con ratón para rotar 360° · Modelo CAD Wireframe
            </div>
          </div>

          <!-- Technical Specs & Tolerance Box (4 cols) -->
          <div class="lg:col-span-4 p-5 sm:p-6 bg-surface-container-low flex flex-col justify-between">
            <div>
              <span class="bg-surface-container text-primary font-mono-data text-[10px] font-bold uppercase px-2 py-0.5 mb-2 inline-block border-l-2 border-secondary">
                Certificación FAI 100%
              </span>
              <h4 class="font-headline-sm text-base text-primary font-bold mb-2">Protocolo de Medición Tridimensional</h4>
              <p class="font-body-sm text-xs text-on-surface-variant mb-4 leading-relaxed">
                Todas las piezas producidas en planta son sometidas a escaneo óptico y palpado por contacto en cuartos climatizados antes de su embalaje en atmósfera protegida.
              </p>

              <div class="space-y-2 font-mono-data text-xs">
                <div class="flex justify-between border-b border-outline-variant pb-1.5">
                  <span class="text-on-surface-variant">Incertidumbre CMM:</span>
                  <strong class="text-primary">0.9 + L/350 µm</strong>
                </div>
                <div class="flex justify-between border-b border-outline-variant pb-1.5">
                  <span class="text-on-surface-variant">Capacidad de Proceso:</span>
                  <strong class="text-secondary font-bold">Cpk &gt; 1.67</strong>
                </div>
                <div class="flex justify-between border-b border-outline-variant pb-1.5">
                  <span class="text-on-surface-variant">Trazabilidad de Molino:</span>
                  <strong class="text-primary">MTR EN 10204 3.1</strong>
                </div>
                <div class="flex justify-between">
                  <span class="text-on-surface-variant">Norma Militar/Aero:</span>
                  <strong class="text-primary">AS9100D / Mil-Spec</strong>
                </div>
              </div>
            </div>

            <button class="w-full mt-4 bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase py-2.5 transition-colors flex items-center justify-center gap-1.5 text-xs" onclick="window.openLandingRfqModal('${company.name}', '${company.contact.whatsapp}', 'Validación Dimensional de Plano')">
              <span>Cargar Plano para Validación CMM</span>
              <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>
    `;
  } else if (layer === "services") {
    // Interactive Service Scope & Diagnostic Explorer (NO CAD simulation)
    return `
      <section class="border border-outline-variant bg-surface-container-lowest mb-8 shadow-sm">
        <div class="p-4 sm:p-5 border-b border-outline-variant bg-surface-container-low flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="font-mono-data text-xs text-secondary font-bold uppercase tracking-wider">
              ${isEs ? "ALCANCE OPERATIVO & BLINDAJE CORPORATIVO" : "SERVICE SCOPE & CORPORATE COMPLIANCE"}
            </div>
            <h3 class="font-headline-sm text-lg text-primary font-bold">
              ${isEs ? "Explorador de Áreas de Práctica & Acuerdos de Nivel de Servicio (SLA)" : "Practice Areas & Service Level Agreement (SLA) Explorer"}
            </h3>
          </div>
          <div class="flex items-center gap-2">
            <span class="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 text-xs font-mono-data font-bold flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              SLA Activo 2026
            </span>
          </div>
        </div>

        <div class="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-surface-container-lowest">
          <div class="border border-outline-variant p-5 bg-surface-container-low flex flex-col justify-between">
            <div>
              <div class="w-8 h-8 bg-secondary text-on-secondary flex items-center justify-center font-bold mb-3">
                <span class="material-symbols-outlined text-[18px]">verified_user</span>
              </div>
              <h4 class="font-headline-sm text-base text-primary font-bold mb-1">${isEs ? "Garantía de Cumplimiento" : "Compliance Guarantee"}</h4>
              <p class="font-body-sm text-xs text-on-surface-variant mb-4 leading-relaxed">
                ${isEs ? "Dictámenes emitidos con firma de perito acreditado y póliza de responsabilidad profesional para plantas maquiladoras." : "Opinions issued under certified expert seal and professional liability coverage."}
              </p>
            </div>
            <div class="pt-3 border-t border-outline-variant font-mono-data text-xs text-secondary font-bold">
              100% Blindaje Legal / REPSE
            </div>
          </div>

          <div class="border border-outline-variant p-5 bg-surface-container-low flex flex-col justify-between">
            <div>
              <div class="w-8 h-8 bg-primary text-surface-bright flex items-center justify-center font-bold mb-3">
                <span class="material-symbols-outlined text-[18px]">speed</span>
              </div>
              <h4 class="font-headline-sm text-base text-primary font-bold mb-1">${isEs ? "Tiempo de Reacción Rápida" : "Rapid Turnaround"}</h4>
              <p class="font-body-sm text-xs text-on-surface-variant mb-4 leading-relaxed">
                ${isEs ? "Mesa de urgencias aduanales y cobertura 24/7 en cruces fronterizos y carreteras con tiempo de despacho menor a 15 minutos." : "Emergency desk responding to customs seizures and logistics incidents in under 15 minutes."}
              </p>
            </div>
            <div class="pt-3 border-t border-outline-variant font-mono-data text-xs text-secondary font-bold">
              SLA &lt; 15 min de Respuesta
            </div>
          </div>

          <div class="border border-outline-variant p-5 bg-surface-container-low flex flex-col justify-between">
            <div>
              <div class="w-8 h-8 bg-surface-container-highest text-primary flex items-center justify-center font-bold mb-3 border border-outline-variant">
                <span class="material-symbols-outlined text-[18px]">lock</span>
              </div>
              <h4 class="font-headline-sm text-base text-primary font-bold mb-1">${isEs ? "Acuerdo de Confidencialidad" : "Strict NDA Protocol"}</h4>
              <p class="font-body-sm text-xs text-on-surface-variant mb-4 leading-relaxed">
                ${isEs ? "Protocolo binacional de confidencialidad de datos industriales, patentes de ingeniería y nóminas corporativas." : "Bi-national confidentiality protocol protecting plant IP, engineering drawings, and corporate payroll."}
              </p>
            </div>
            <div class="pt-3 border-t border-outline-variant font-mono-data text-xs text-secondary font-bold">
              NDA Mutuo Inmediato
            </div>
          </div>
        </div>
      </section>
    `;
  } else if (layer === "amenities") {
    // Interactive Park Access & Amenities Explorer (NO CAD simulation)
    const parkAccess = company.parkAccess || {
      gate: "Acceso Principal a Parque Industrial",
      shiftCompatibility: "Turnos Matutino, Vespertino y Nocturno",
      corporateBilling: "CFDI inmediato y crédito quincenal"
    };

    return `
      <section class="border border-outline-variant bg-surface-container-lowest mb-8 shadow-sm">
        <div class="p-4 sm:p-5 border-b border-outline-variant bg-surface-container-low flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="font-mono-data text-xs text-emerald-800 font-bold uppercase tracking-wider">
              ${isEs ? "ACCESO EN PARQUE & COMPATIBILIDAD CON TURNOS" : "PARK ACCESS & SHIFT COMPATIBILITY"}
            </div>
            <h3 class="font-headline-sm text-lg text-primary font-bold">
              ${isEs ? "Servicios Operativos en Sitio & Convenios Corporativos" : "On-Site Operational Facilities & Corporate Perks"}
            </h3>
          </div>
          <div class="flex items-center gap-2">
            <span class="bg-surface-container-lowest border border-outline-variant px-3 py-1 font-mono-data text-xs text-primary font-bold">
              📍 ${company.zone}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 min-h-[220px]">
          <!-- Access & Shift Details (8 cols) -->
          <div class="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-outline-variant">
            <div>
              <div class="flex items-center gap-2 mb-3">
                <span class="bg-secondary text-on-secondary text-[10px] font-mono-data font-bold uppercase px-2 py-0.5">
                  ${isEs ? "UBICACIÓN DENTRO DEL PARQUE" : "IN-PARK LOCATION"}
                </span>
                <span class="text-xs font-mono-data text-on-surface-variant font-bold">${parkAccess.gate}</span>
              </div>

              <h4 class="font-headline-sm text-xl text-primary font-bold mb-3">
                ${isEs ? "Diseñado para el Ritmo Continuo de la Industria" : "Engineered for Continuous Industrial Pace"}
              </h4>
              <p class="font-body-sm text-sm text-on-surface-variant mb-6 leading-relaxed">
                ${company.tagline}
              </p>

              <!-- Shift compatibility grid -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono-data text-xs">
                <div class="p-3 border border-outline-variant bg-surface-container-low">
                  <div class="font-bold text-primary mb-1">Turno 1 (Matutino)</div>
                  <div class="text-[11px] text-on-surface-variant">06:00 - 14:00 hrs</div>
                  <div class="text-emerald-700 font-bold text-[10px] mt-1">✓ Cobertura Activa</div>
                </div>
                <div class="p-3 border border-outline-variant bg-surface-container-low">
                  <div class="font-bold text-primary mb-1">Turno 2 (Vespertino)</div>
                  <div class="text-[11px] text-on-surface-variant">14:00 - 22:00 hrs</div>
                  <div class="text-emerald-700 font-bold text-[10px] mt-1">✓ Cobertura Activa</div>
                </div>
                <div class="p-3 border border-outline-variant bg-surface-container-low">
                  <div class="font-bold text-primary mb-1">Turno 3 (Nocturno)</div>
                  <div class="text-[11px] text-on-surface-variant">22:00 - 06:00 hrs</div>
                  <div class="text-secondary font-bold text-[10px] mt-1">${company.operatingHours?.includes("24") ? "✓ Guardia 24 Horas" : "Consultar guardia"}</div>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-outline-variant mt-4 text-xs font-mono-data text-on-surface-variant flex items-center justify-between">
              <span>💳 ${parkAccess.corporateBilling}</span>
            </div>
          </div>

          <!-- Quick Action Card (4 cols) -->
          <div class="lg:col-span-4 p-6 bg-surface-container-low flex flex-col justify-between">
            <div>
              <span class="bg-surface-container text-primary font-mono-data text-[10px] font-bold uppercase px-2 py-0.5 mb-2 inline-block border-l-2 border-emerald-700">
                ${isEs ? "Convenio Preferencial" : "Preferred Corporate Account"}
              </span>
              <h4 class="font-headline-sm text-base text-primary font-bold mb-2">
                ${isEs ? "Atención Prioritaria a Colaboradores" : "Priority Employee Service"}
              </h4>
              <p class="font-body-sm text-xs text-on-surface-variant mb-4 leading-relaxed">
                ${isEs ? "Las plantas ubicadas en este parque cuentan con línea de crédito directa, facturación mensual consolidada y tarifas con descuento mediante gafete institucional." : "Facilities in this corridor receive direct corporate billing and ID badge discounts."}
              </p>
            </div>

            <button class="w-full bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase py-2.5 transition-colors flex items-center justify-center gap-1.5 text-xs" onclick="window.openLandingRfqModal('${company.name}', '${company.contact.whatsapp}', 'Convenio Corporativo de Planta')">
              <span>${isEs ? "Dar de Alta Convenio de Planta" : "Register Facility Agreement"}</span>
              <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>
    `;
  }
}

// -------------------------------------------------------------
// 3. MODULAR DOSSIER TABS RENDERER (Layer-tailored)
// -------------------------------------------------------------
function renderModularDossier(company, layer, isEs) {
  if (layer === "industrial") {
    // 5-Tab Technical Dossier
    return renderIndustrialTabs(company, isEs);
  } else if (layer === "services") {
    // 4-Tab Professional Services Dossier
    return renderServicesTabs(company, isEs);
  } else if (layer === "amenities") {
    // 4-Tab Park Amenities Dossier
    return renderAmenitiesTabs(company, isEs);
  }
}

function renderIndustrialTabs(company, isEs) {
  return `
    <section class="border border-outline-variant bg-surface-container-lowest mb-10 shadow-sm">
      <div class="grid grid-cols-2 md:grid-cols-5 border-b border-outline-variant bg-surface-container-low divide-x divide-outline-variant" id="profileTabsNav">
        <button class="text-left p-3.5 sm:p-4 transition-all ${activeProfileTab === 'portfolio' ? 'bg-surface-container-lowest border-b-2 border-secondary font-bold text-primary' : 'hover:bg-surface-container-lowest text-on-surface-variant'}" onclick="window.switchProfileTab('portfolio')">
          <div class="font-mono-data text-xs text-secondary font-bold mb-1">01. PIEZAS & PROYECTOS</div>
          <div class="font-headline-sm text-xs sm:text-sm truncate">Portafolio Fabricado</div>
        </button>
        <button class="text-left p-3.5 sm:p-4 transition-all ${activeProfileTab === 'matrix' ? 'bg-surface-container-lowest border-b-2 border-secondary font-bold text-primary' : 'hover:bg-surface-container-lowest text-on-surface-variant'}" onclick="window.switchProfileTab('matrix')">
          <div class="font-mono-data text-xs text-secondary font-bold mb-1">02. ALEACIONES & LÍMITES</div>
          <div class="font-headline-sm text-xs sm:text-sm truncate">Matriz de Materiales</div>
        </button>
        <button class="text-left p-3.5 sm:p-4 transition-all ${activeProfileTab === 'machinery' ? 'bg-surface-container-lowest border-b-2 border-secondary font-bold text-primary' : 'hover:bg-surface-container-lowest text-on-surface-variant'}" onclick="window.switchProfileTab('machinery')">
          <div class="font-mono-data text-xs text-secondary font-bold mb-1">03. MAQUINARIA & TURNOS</div>
          <div class="font-headline-sm text-xs sm:text-sm truncate">Semáforo de Capacidad</div>
        </button>
        <button class="text-left p-3.5 sm:p-4 transition-all ${activeProfileTab === 'logistics' ? 'bg-surface-container-lowest border-b-2 border-secondary font-bold text-primary' : 'hover:bg-surface-container-lowest text-on-surface-variant'}" onclick="window.switchProfileTab('logistics')">
          <div class="font-mono-data text-xs text-secondary font-bold mb-1">04. T-MEC & LOGÍSTICA</div>
          <div class="font-headline-sm text-xs sm:text-sm truncate">Certificaciones y Cruces</div>
        </button>
        <button class="text-left p-3.5 sm:p-4 transition-all ${activeProfileTab === 'cases' ? 'bg-surface-container-lowest border-b-2 border-secondary font-bold text-primary' : 'hover:bg-surface-container-lowest text-on-surface-variant'}" onclick="window.switchProfileTab('cases')">
          <div class="font-mono-data text-xs text-secondary font-bold mb-1">05. CASOS DE ÉXITO</div>
          <div class="font-headline-sm text-xs sm:text-sm truncate">Métricas de Retorno</div>
        </button>
      </div>

      <!-- Tab 1: Portafolio Visual -->
      <div class="p-6 sm:p-8 ${activeProfileTab === 'portfolio' ? 'block' : 'hidden'}" id="tabContentPortfolio">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          ${(company.portfolioPieces || []).map((piece) => `
            <div class="border border-outline-variant bg-surface-container-low p-5 flex flex-col justify-between hover:border-secondary transition-all">
              <div>
                <div class="relative h-44 overflow-hidden mb-4 border border-outline-variant bg-primary-container">
                  <img src="${piece.image}" alt="${piece.name}" class="w-full h-full object-cover filter contrast-110 hover:scale-105 transition-all duration-300" />
                  <span class="absolute top-2 left-2 bg-primary text-surface-bright text-[10px] font-mono-data uppercase px-2 py-0.5">${piece.category}</span>
                </div>
                <h4 class="font-headline-sm text-base text-primary font-bold mb-2">${piece.name}</h4>
                <p class="font-body-sm text-xs text-on-surface-variant mb-4 leading-relaxed">${piece.desc || ''}</p>
                <div class="space-y-1 font-mono-data text-xs bg-surface-container-lowest p-2.5 border border-outline-variant mb-3">
                  <div class="flex justify-between"><span>Material:</span><strong class="text-primary">${piece.material}</strong></div>
                  <div class="flex justify-between"><span>Tolerancia:</span><strong class="text-secondary">${piece.tolerance}</strong></div>
                </div>
              </div>
              <button class="w-full bg-surface-container-lowest hover:bg-secondary hover:text-on-secondary text-primary border border-outline-variant py-2 text-xs font-label-caps uppercase transition-colors" onclick="window.openLandingRfqModal('${company.name}', '${company.contact.whatsapp}', '${piece.name}')">
                Cotizar Pieza Similar
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tab 2: Matriz -->
      <div class="p-6 sm:p-8 ${activeProfileTab === 'matrix' ? 'block' : 'hidden'}" id="tabContentMatrix">
        <div class="overflow-x-auto border border-outline-variant">
          <table class="w-full text-left font-mono-data text-xs border-collapse">
            <thead>
              <tr class="bg-surface-container-high text-primary border-b border-outline-variant">
                <th class="p-3">Aleación / Material</th>
                <th class="p-3">Tolerancia Garantizada</th>
                <th class="p-3">Acabado Superficial</th>
                <th class="p-3">Certificación de Molino</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline-variant bg-surface-container-lowest">
              <tr><td class="p-3 font-bold">Titanio Grado 5 (Ti-6Al-4V)</td><td class="p-3 text-secondary font-bold">± 0.003 mm</td><td class="p-3">Ra 0.4 µm</td><td class="p-3">MTR EN 10204 3.1</td></tr>
              <tr><td class="p-3 font-bold">Inconel 718 / 625</td><td class="p-3 text-secondary font-bold">± 0.004 mm</td><td class="p-3">Ra 0.2 µm</td><td class="p-3">AMS 5662 / 5666</td></tr>
              <tr><td class="p-3 font-bold">Invar 36 (Baja Dilatación)</td><td class="p-3 text-secondary font-bold">± 0.005 mm</td><td class="p-3">Ra 0.2 µm Espejo</td><td class="p-3">ASTM F1684</td></tr>
              <tr><td class="p-3 font-bold">Aluminio Aeroespacial 7075-T6</td><td class="p-3 text-secondary font-bold">± 0.002 mm</td><td class="p-3">Ra 0.8 µm</td><td class="p-3">AMS-QQ-A-225/9</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tab 3: Maquinaria -->
      <div class="p-6 sm:p-8 ${activeProfileTab === 'machinery' ? 'block' : 'hidden'}" id="tabContentMachinery">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="border border-outline-variant p-4 bg-surface-container-low">
            <div class="flex justify-between items-center mb-2">
              <h4 class="font-bold text-sm text-primary">Celdas de 5 Ejes Hermle C42U</h4>
              <span class="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 font-mono-data font-bold">Capacidad Disponible</span>
            </div>
            <p class="font-body-sm text-xs text-on-surface-variant">Carreras: X: 800 mm, Y: 800 mm, Z: 550 mm. Husillo 18,000 RPM con refrigeración a 80 bar.</p>
          </div>
          <div class="border border-outline-variant p-4 bg-surface-container-low">
            <div class="flex justify-between items-center mb-2">
              <h4 class="font-bold text-sm text-primary">Metrología CMM Zeiss Prismo</h4>
              <span class="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 font-mono-data font-bold">Certificada 2026</span>
            </div>
            <p class="font-body-sm text-xs text-on-surface-variant">Laboratorio climatizado a 20.0°C ± 0.1°C con palpado continuo VAST gold.</p>
          </div>
        </div>
      </div>

      <!-- Tab 4: Logística -->
      <div class="p-6 sm:p-8 ${activeProfileTab === 'logistics' ? 'block' : 'hidden'}" id="tabContentLogistics">
        <div class="space-y-3 font-mono-data text-xs">
          <div class="p-3 border border-outline-variant bg-surface-container-low flex justify-between">
            <span>Certificaciones Activas:</span><strong class="text-primary">AS9100 Rev D, ISO 9001:2015, C-TPAT Tier 2</strong>
          </div>
          <div class="p-3 border border-outline-variant bg-surface-container-low flex justify-between">
            <span>Cruces Fronterizos Habituales:</span><strong class="text-primary">Nuevo Laredo / Colombia Bridge (FAST Lane)</strong>
          </div>
        </div>
      </div>

      <!-- Tab 5: Casos -->
      <div class="p-6 sm:p-8 ${activeProfileTab === 'cases' ? 'block' : 'hidden'}" id="tabContentCases">
        ${(company.caseStudies || []).map(cs => `
          <div class="border border-outline-variant p-5 bg-surface-container-low mb-4">
            <span class="text-xs font-mono-data text-secondary font-bold uppercase mb-1 block">${cs.client}</span>
            <h4 class="font-headline-sm text-base text-primary font-bold mb-2">${cs.title}</h4>
            <p class="font-body-sm text-xs text-on-surface-variant mb-3">${cs.outcome}</p>
            <div class="text-xs font-mono-data font-bold text-emerald-800 bg-surface-container-lowest inline-block px-3 py-1 border border-outline-variant">${cs.metric}</div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function renderServicesTabs(company, isEs) {
  return `
    <section class="border border-outline-variant bg-surface-container-lowest mb-10 shadow-sm">
      <div class="grid grid-cols-2 md:grid-cols-4 border-b border-outline-variant bg-surface-container-low divide-x divide-outline-variant" id="profileTabsNav">
        <button class="text-left p-3.5 sm:p-4 transition-all ${activeProfileTab === 'services' ? 'bg-surface-container-lowest border-b-2 border-secondary font-bold text-primary' : 'hover:bg-surface-container-lowest text-on-surface-variant'}" onclick="window.switchProfileTab('services')">
          <div class="font-mono-data text-xs text-secondary font-bold mb-1">01. CATÁLOGO & ENTREGABLES</div>
          <div class="font-headline-sm text-xs sm:text-sm truncate">Servicios Especializados</div>
        </button>
        <button class="text-left p-3.5 sm:p-4 transition-all ${activeProfileTab === 'accreditations' ? 'bg-surface-container-lowest border-b-2 border-secondary font-bold text-primary' : 'hover:bg-surface-container-lowest text-on-surface-variant'}" onclick="window.switchProfileTab('accreditations')">
          <div class="font-mono-data text-xs text-secondary font-bold mb-1">02. REGISTROS & LICENCIAS</div>
          <div class="font-headline-sm text-xs sm:text-sm truncate">Acreditaciones Oficiales</div>
        </button>
        <button class="text-left p-3.5 sm:p-4 transition-all ${activeProfileTab === 'cases' ? 'bg-surface-container-lowest border-b-2 border-secondary font-bold text-primary' : 'hover:bg-surface-container-lowest text-on-surface-variant'}" onclick="window.switchProfileTab('cases')">
          <div class="font-mono-data text-xs text-secondary font-bold mb-1">03. CASOS DE ÉXITO</div>
          <div class="font-headline-sm text-xs sm:text-sm truncate">Resultados y Mitigación</div>
        </button>
        <button class="text-left p-3.5 sm:p-4 transition-all ${activeProfileTab === 'team' ? 'bg-surface-container-lowest border-b-2 border-secondary font-bold text-primary' : 'hover:bg-surface-container-lowest text-on-surface-variant'}" onclick="window.switchProfileTab('team')">
          <div class="font-mono-data text-xs text-secondary font-bold mb-1">04. SOCIOS & EQUIPO</div>
          <div class="font-headline-sm text-xs sm:text-sm truncate">Directorio Consultivo</div>
        </button>
      </div>

      <!-- Tab 1: Servicios & Entregables -->
      <div class="p-6 sm:p-8 ${activeProfileTab === 'services' ? 'block' : 'hidden'}" id="tabContentServices">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${(company.serviceCatalog || []).map(svc => `
            <div class="border border-outline-variant bg-surface-container-low p-5 flex flex-col justify-between hover:border-secondary transition-all">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="bg-primary text-surface-bright text-[10px] font-mono-data uppercase px-2 py-0.5">${svc.category}</span>
                  <span class="text-secondary font-mono-data text-xs font-bold">${svc.sla}</span>
                </div>
                <h4 class="font-headline-sm text-base text-primary font-bold mb-2">${svc.title}</h4>
                <p class="font-body-sm text-xs text-on-surface-variant mb-4 leading-relaxed">${svc.desc}</p>
                <div class="p-3 bg-surface-container-lowest border border-outline-variant mb-4 font-mono-data text-xs">
                  <span class="text-on-surface-variant block mb-1 font-bold text-[11px] uppercase">Entregables Oficiales:</span>
                  <span class="text-primary">${svc.deliverables}</span>
                </div>
              </div>
              <button class="w-full bg-surface-container-lowest hover:bg-secondary hover:text-on-secondary text-primary border border-outline-variant py-2 text-xs font-label-caps uppercase transition-colors" onclick="window.openLandingRfqModal('${company.name}', '${company.contact.whatsapp}', '${svc.title}')">
                Solicitar Propuesta para este Servicio
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tab 2: Acreditaciones -->
      <div class="p-6 sm:p-8 ${activeProfileTab === 'accreditations' ? 'block' : 'hidden'}" id="tabContentAccreditations">
        <div class="space-y-4">
          ${(company.accreditations || []).map(acc => `
            <div class="border border-outline-variant p-4 bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div class="font-bold text-sm text-primary">${acc.name}</div>
                <div class="font-mono-data text-xs text-on-surface-variant">Emitido por: ${acc.issuer}</div>
              </div>
              <div class="flex items-center gap-2">
                <span class="bg-surface-container-lowest border border-outline-variant px-2.5 py-1 text-xs font-mono-data font-bold">${acc.year}</span>
                <span class="text-emerald-700 font-bold text-xs flex items-center gap-1">✓ Validado</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tab 3: Casos de Éxito -->
      <div class="p-6 sm:p-8 ${activeProfileTab === 'cases' ? 'block' : 'hidden'}" id="tabContentCases">
        ${(company.caseStudies || []).map(cs => `
          <div class="border border-outline-variant p-5 bg-surface-container-low mb-4">
            <span class="text-xs font-mono-data text-secondary font-bold uppercase mb-1 block">${cs.client}</span>
            <h4 class="font-headline-sm text-base text-primary font-bold mb-2">${cs.title}</h4>
            <p class="font-body-sm text-xs text-on-surface-variant mb-3">${cs.outcome}</p>
            <div class="text-xs font-mono-data font-bold text-emerald-800 bg-surface-container-lowest inline-block px-3 py-1 border border-outline-variant">${cs.metric}</div>
          </div>
        `).join('')}
      </div>

      <!-- Tab 4: Equipo Directivo -->
      <div class="p-6 sm:p-8 ${activeProfileTab === 'team' ? 'block' : 'hidden'}" id="tabContentTeam">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${(company.team || []).map(member => `
            <div class="border border-outline-variant p-5 bg-surface-container-low">
              <h4 class="font-headline-sm text-base text-primary font-bold mb-1">${member.name}</h4>
              <div class="font-mono-data text-xs text-secondary font-bold mb-3">${member.role}</div>
              <p class="font-body-sm text-xs text-on-surface-variant leading-relaxed">${member.bio}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderAmenitiesTabs(company, isEs) {
  return `
    <section class="border border-outline-variant bg-surface-container-lowest mb-10 shadow-sm">
      <div class="grid grid-cols-2 md:grid-cols-4 border-b border-outline-variant bg-surface-container-low divide-x divide-outline-variant" id="profileTabsNav">
        <button class="text-left p-3.5 sm:p-4 transition-all ${activeProfileTab === 'menu' ? 'bg-surface-container-lowest border-b-2 border-secondary font-bold text-primary' : 'hover:bg-surface-container-lowest text-on-surface-variant'}" onclick="window.switchProfileTab('menu')">
          <div class="font-mono-data text-xs text-secondary font-bold mb-1">01. MENÚS & PAQUETES</div>
          <div class="font-headline-sm text-xs sm:text-sm truncate">Servicios Disponibles</div>
        </button>
        <button class="text-left p-3.5 sm:p-4 transition-all ${activeProfileTab === 'facilities' ? 'bg-surface-container-lowest border-b-2 border-secondary font-bold text-primary' : 'hover:bg-surface-container-lowest text-on-surface-variant'}" onclick="window.switchProfileTab('facilities')">
          <div class="font-mono-data text-xs text-secondary font-bold mb-1">02. INSTALACIONES & SALAS</div>
          <div class="font-headline-sm text-xs sm:text-sm truncate">Infraestructura en Sitio</div>
        </button>
        <button class="text-left p-3.5 sm:p-4 transition-all ${activeProfileTab === 'agreements' ? 'bg-surface-container-lowest border-b-2 border-secondary font-bold text-primary' : 'hover:bg-surface-container-lowest text-on-surface-variant'}" onclick="window.switchProfileTab('agreements')">
          <div class="font-mono-data text-xs text-secondary font-bold mb-1">03. CONVENIOS & GAFETES</div>
          <div class="font-headline-sm text-xs sm:text-sm truncate">Planes Corporativos</div>
        </button>
        <button class="text-left p-3.5 sm:p-4 transition-all ${activeProfileTab === 'hygiene' ? 'bg-surface-container-lowest border-b-2 border-secondary font-bold text-primary' : 'hover:bg-surface-container-lowest text-on-surface-variant'}" onclick="window.switchProfileTab('hygiene')">
          <div class="font-mono-data text-xs text-secondary font-bold mb-1">04. HIGIENE & CALIDAD</div>
          <div class="font-headline-sm text-xs sm:text-sm truncate">Distintivos y Permisos</div>
        </button>
      </div>

      <!-- Tab 1: Menús / Servicios -->
      <div class="p-6 sm:p-8 ${activeProfileTab === 'menu' ? 'block' : 'hidden'}" id="tabContentMenu">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${(company.menuOrServices || []).map(item => `
            <div class="border border-outline-variant bg-surface-container-low p-5 flex flex-col justify-between hover:border-secondary transition-all">
              <div>
                <div class="relative h-44 overflow-hidden mb-4 border border-outline-variant bg-primary-container">
                  <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover filter contrast-110 hover:scale-105 transition-all duration-300" />
                  <span class="absolute top-2 left-2 bg-primary text-surface-bright text-[10px] font-mono-data uppercase px-2 py-0.5">${item.category}</span>
                  <span class="absolute bottom-2 right-2 bg-surface-container-lowest text-secondary font-bold text-xs font-mono-data px-2 py-0.5 border border-outline-variant">${item.priceOrTier}</span>
                </div>
                <h4 class="font-headline-sm text-base text-primary font-bold mb-2">${item.title}</h4>
                <p class="font-body-sm text-xs text-on-surface-variant mb-4 leading-relaxed">${item.desc}</p>
              </div>
              <button class="w-full bg-surface-container-lowest hover:bg-secondary hover:text-on-secondary text-primary border border-outline-variant py-2 text-xs font-label-caps uppercase transition-colors" onclick="window.openLandingRfqModal('${company.name}', '${company.contact.whatsapp}', '${item.title}')">
                ${isEs ? "Reservar / Solicitar Servicio" : "Book / Order Service"}
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tab 2: Instalaciones -->
      <div class="p-6 sm:p-8 ${activeProfileTab === 'facilities' ? 'block' : 'hidden'}" id="tabContentFacilities">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${(company.facilities || []).map(fac => `
            <div class="border border-outline-variant p-4 bg-surface-container-low">
              <span class="text-secondary font-mono-data text-xs font-bold uppercase block mb-1">${fac.count}</span>
              <h4 class="font-headline-sm text-sm text-primary font-bold">${fac.name}</h4>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tab 3: Convenios Corporativos -->
      <div class="p-6 sm:p-8 ${activeProfileTab === 'agreements' ? 'block' : 'hidden'}" id="tabContentAgreements">
        <div class="space-y-4">
          ${(company.corporateAgreements || []).map(agr => `
            <div class="border border-outline-variant p-4 bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div class="font-bold text-sm text-primary">${agr.client}</div>
                <div class="font-body-sm text-xs text-on-surface-variant">${agr.plan}</div>
              </div>
              <div class="flex items-center gap-2">
                <span class="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 text-xs font-mono-data font-bold">${agr.discount}</span>
                <span class="text-xs font-mono-data text-on-surface-variant">${agr.benefit}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tab 4: Higiene & Calidad -->
      <div class="p-6 sm:p-8 ${activeProfileTab === 'hygiene' ? 'block' : 'hidden'}" id="tabContentHygiene">
        <div class="space-y-4">
          ${(company.hygieneCertifications || []).map(cert => `
            <div class="border border-outline-variant p-4 bg-surface-container-low flex items-center justify-between">
              <div>
                <div class="font-bold text-sm text-primary">${cert.name}</div>
                <div class="font-mono-data text-xs text-on-surface-variant">Emitido por: ${cert.issuer}</div>
              </div>
              <span class="bg-surface-container-lowest border border-outline-variant px-2.5 py-1 text-xs font-mono-data font-bold">${cert.year}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// -------------------------------------------------------------
// 4. MODULAR INQUIRY / RFQ DRAWER
// -------------------------------------------------------------
function renderModularInquiryDrawer(company, layer, isEs) {
  const wizardServices = company.rfqWizard?.services || [
    { id: "s1", label: "Servicio / Requerimiento Principal", desc: "Según especificaciones técnicas" }
  ];
  const wizardVolumes = company.rfqWizard?.volumes || [
    { id: "v1", label: "Servicio Inicial / Piloto" },
    { id: "v2", label: "Contrato Recurrente / Convenio Anual" }
  ];

  let drawerTitle = isEs ? "Solicitud Formal de Cotización RFQ" : "Formal RFQ Inquiry";
  let step1Desc = isEs ? "Seleccione el servicio o pieza a cotizar:" : "Select capability or service to quote:";

  if (layer === "services") {
    drawerTitle = isEs ? "Solicitud de Asesoría & Propuesta Técnica" : "Advisory & Technical Proposal Request";
    step1Desc = isEs ? "Seleccione el área de práctica o diagnóstico requerido:" : "Select practice area or diagnostic requirement:";
  } else if (layer === "amenities") {
    drawerTitle = isEs ? "Reservación & Solicitud de Convenio en Parque" : "Park Service Booking & Corporate Agreement";
    step1Desc = isEs ? "Seleccione el servicio, menú o reservación requerida:" : "Select menu, reservation or service required:";
  }

  return `
    <div id="landingRfqModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-none flex justify-end hidden opacity-0 transition-opacity duration-200">
      <div id="landingRfqDrawer" class="w-full max-w-xl bg-background h-full shadow-2xl flex flex-col justify-between border-l border-outline-variant overflow-y-auto transform translate-x-full transition-transform duration-300">
        
        <!-- Drawer Top -->
        <div class="p-6 border-b border-outline-variant flex items-center justify-between bg-surface-container-lowest">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-mono-data text-xs text-secondary font-bold uppercase" id="drawerStepTag">PASO 01 / 04</span>
              <span class="text-outline-variant">|</span>
              <span class="font-mono-data text-xs text-on-surface-variant uppercase">${company.name}</span>
            </div>
            <h3 class="font-headline-sm text-lg text-primary font-bold mt-1">${drawerTitle}</h3>
          </div>
          <button class="p-2 border border-outline-variant hover:border-primary text-primary transition-colors" onclick="window.closeLandingRfqModal()">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div class="h-1 bg-surface-container-low w-full">
          <div id="drawerProgressBar" class="h-full bg-secondary transition-all duration-300" style="width: 25%;"></div>
        </div>

        <!-- Step Container -->
        <div class="p-6 sm:p-8 flex-1 overflow-y-auto">
          
          <!-- Step 1 -->
          <div id="drawerStep1" class="block">
            <h4 class="font-headline-sm text-base text-primary font-bold mb-2">${step1Desc}</h4>
            <div class="space-y-3 mb-6">
              ${wizardServices.map((svc, idx) => `
                <label class="flex items-start p-3.5 border border-outline-variant bg-surface-container-lowest hover:border-secondary cursor-pointer transition-colors">
                  <input type="radio" name="rfq_service" value="${svc.label}" ${idx === 0 ? 'checked' : ''} onchange="window.setDrawerService(this.value)" class="mt-1 text-secondary focus:ring-0 mr-3" />
                  <div>
                    <div class="font-body-md font-bold text-sm text-primary">${svc.label}</div>
                    <div class="font-mono-data text-xs text-on-surface-variant">${svc.desc}</div>
                  </div>
                </label>
              `).join('')}
            </div>
            <button class="w-full bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase py-3 transition-colors flex items-center justify-center gap-1.5" onclick="window.setDrawerStep(2)">
              <span>Continuar al Paso 2</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <!-- Step 2 -->
          <div id="drawerStep2" class="hidden">
            <h4 class="font-headline-sm text-base text-primary font-bold mb-2">Alcance, Volumen o Frecuencia del Requerimiento</h4>
            <div class="space-y-3 mb-6">
              ${wizardVolumes.map((vol, idx) => `
                <label class="flex items-center p-3.5 border border-outline-variant bg-surface-container-lowest hover:border-secondary cursor-pointer transition-colors">
                  <input type="radio" name="rfq_volume" value="${vol.label}" ${idx === 0 ? 'checked' : ''} onchange="window.setDrawerVolume(this.value)" class="text-secondary focus:ring-0 mr-3" />
                  <div class="font-body-md font-bold text-sm text-primary">${vol.label}</div>
                </label>
              `).join('')}
            </div>
            <div class="flex gap-3">
              <button class="w-1/3 border border-outline-variant bg-surface-container-lowest hover:border-primary font-label-caps text-label-caps uppercase py-3" onclick="window.setDrawerStep(1)">Atrás</button>
              <button class="w-2/3 bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase py-3 flex items-center justify-center gap-1.5" onclick="window.setDrawerStep(3)">
                <span>Continuar</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          <!-- Step 3 -->
          <div id="drawerStep3" class="hidden">
            <h4 class="font-headline-sm text-base text-primary font-bold mb-2">Especificaciones o Instrucciones Especiales</h4>
            <div class="mb-6">
              <textarea id="drawerSpecsInput" rows="4" class="w-full border border-outline-variant p-3 font-body-sm text-primary bg-surface-container-lowest focus:border-secondary focus:ring-0" placeholder="Indique fechas clave, normas aplicables, tolerancias o número de comensales/colaboradores..."></textarea>
            </div>
            <div class="flex gap-3">
              <button class="w-1/3 border border-outline-variant bg-surface-container-lowest hover:border-primary font-label-caps text-label-caps uppercase py-3" onclick="window.setDrawerStep(2)">Atrás</button>
              <button class="w-2/3 bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase py-3 flex items-center justify-center gap-1.5" onclick="window.setDrawerStep(4)">
                <span>Continuar</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          <!-- Step 4 -->
          <div id="drawerStep4" class="hidden">
            <h4 class="font-headline-sm text-base text-primary font-bold mb-2">Datos de Contacto Corporativo</h4>
            <div class="space-y-3 mb-6">
              <input type="text" id="drawerNameInput" placeholder="Nombre Completo del Responsable" class="w-full border border-outline-variant p-2.5 font-body-sm bg-surface-container-lowest" />
              <input type="text" id="drawerCompanyInput" placeholder="Empresa / Planta Solicitante" class="w-full border border-outline-variant p-2.5 font-body-sm bg-surface-container-lowest" />
              <input type="email" id="drawerEmailInput" placeholder="Correo Corporativo Oficial" class="w-full border border-outline-variant p-2.5 font-body-sm bg-surface-container-lowest" />
            </div>
            <div class="flex gap-3">
              <button class="w-1/3 border border-outline-variant bg-surface-container-lowest hover:border-primary font-label-caps text-label-caps uppercase py-3" onclick="window.setDrawerStep(3)">Atrás</button>
              <button class="w-2/3 bg-secondary text-on-secondary hover:bg-primary font-label-caps text-label-caps uppercase py-3 flex items-center justify-center gap-1.5" onclick="window.dispatchDrawerRfq('${company.name}', '${company.contact.whatsapp}')">
                <span>Enviar Directo a Dirección</span>
                <span class="material-symbols-outlined text-[16px]">send</span>
              </button>
            </div>
          </div>

        </div>

        <!-- Drawer Footer -->
        <div class="p-4 border-t border-outline-variant bg-surface-container-lowest font-mono-data text-xs text-on-surface-variant flex items-center justify-between">
          <span>🔒 Red Homologada QRO</span>
          <span>Despacho Inmediato</span>
        </div>

      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 5. GLOBAL WINDOW EVENT HANDLERS
// -------------------------------------------------------------
window.switchProfileTab = function(tabName) {
  activeProfileTab = tabName;
  const navContainer = document.getElementById("profileTabsNav");
  if (navContainer) {
    const buttons = navContainer.querySelectorAll("button");
    buttons.forEach(b => {
      b.classList.remove("bg-surface-container-lowest", "border-b-2", "border-secondary", "font-bold", "text-primary");
      b.classList.add("text-on-surface-variant");
    });
  }

  const allPanels = document.querySelectorAll("[id^='tabContent']");
  allPanels.forEach(p => {
    p.classList.add("hidden");
    p.classList.remove("block");
  });

  const activePanelId = `tabContent${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`;
  const targetPanel = document.getElementById(activePanelId);
  if (targetPanel) {
    targetPanel.classList.remove("hidden");
    targetPanel.classList.add("block");
  }
};

window.switchMainGalleryImage = function(src) {
  const mainImg = document.getElementById("mainGalleryImage");
  if (mainImg) {
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = src;
      mainImg.style.opacity = '1';
    }, 150);
  }
};

window.openLandingRfqModal = function(companyName, whatsapp, prefillItem = '') {
  const modal = document.getElementById("landingRfqModal");
  const drawer = document.getElementById("landingRfqDrawer");
  const specsInput = document.getElementById("drawerSpecsInput");
  
  if (specsInput && prefillItem) {
    specsInput.value = `Requerimiento: ${prefillItem}`;
    rfqModalData.service = prefillItem;
  }

  window.setDrawerStep(prefillItem ? 2 : 1);

  if (modal && drawer) {
    modal.classList.remove("hidden");
    setTimeout(() => {
      modal.classList.remove("opacity-0");
      drawer.classList.remove("translate-x-full");
    }, 10);
  }
};

window.closeLandingRfqModal = function() {
  const modal = document.getElementById("landingRfqModal");
  const drawer = document.getElementById("landingRfqDrawer");
  if (modal && drawer) {
    modal.classList.add("opacity-0");
    drawer.classList.add("translate-x-full");
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 250);
  }
};

window.setDrawerStep = function(stepNum) {
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById(`drawerStep${i}`);
    if (el) {
      if (i === stepNum) {
        el.classList.remove("hidden");
        el.classList.add("block");
      } else {
        el.classList.remove("block");
        el.classList.add("hidden");
      }
    }
  }

  const tag = document.getElementById("drawerStepTag");
  const bar = document.getElementById("drawerProgressBar");
  if (tag) tag.textContent = `PASO 0${stepNum} / 04`;
  if (bar) bar.style.width = `${stepNum * 25}%`;
};

window.setDrawerService = function(val) {
  rfqModalData.service = val;
};

window.setDrawerVolume = function(val) {
  rfqModalData.volume = val;
};

window.dispatchDrawerRfq = function(companyName, whatsapp) {
  const name = document.getElementById("drawerNameInput")?.value || "Director de Planta";
  const company = document.getElementById("drawerCompanyInput")?.value || "Empresa Miembro";
  const specs = document.getElementById("drawerSpecsInput")?.value || "Especificaciones según solicitud";

  const msg = encodeURIComponent(
    `*REQUERIMIENTO OFICIAL · RED EMPRESARIAL QRO*\n` +
    `*Empresa Destino:* ${companyName}\n` +
    `*Solicitante:* ${name} (${company})\n` +
    `*Servicio/Concepto:* ${rfqModalData.service || "Servicio General"}\n` +
    `*Alcance:* ${rfqModalData.volume || "General"}\n` +
    `*Detalles:* ${specs}\n` +
    `*Canal:* RED EMPRESARIAL QRO B2B`
  );

  window.open(`https://wa.me/${whatsapp}?text=${msg}`, '_blank');
  window.closeLandingRfqModal();
};

window.openProfileWhatsApp = function(whatsapp, companyName, directorName) {
  const text = encodeURIComponent(`Hola ${directorName}, descubrí su perfil homologado de ${companyName} en RED EMPRESARIAL QRO y me gustaría solicitar información y cotización para un requerimiento en Querétaro.`);
  window.open(`https://wa.me/${whatsapp}?text=${text}`, '_blank');
};

// -------------------------------------------------------------
// 6. 3D WIREFRAME SIMULATION (ONLY INDUSTRIAL)
// -------------------------------------------------------------
function initWireframeCanvas() {
  const canvas = document.getElementById("wireframeCadCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const points = [
    { x: -70, y: -40, z: -40 },
    { x: 70, y: -40, z: -40 },
    { x: 70, y: 40, z: -40 },
    { x: -70, y: 40, z: -40 },
    { x: -50, y: -30, z: 40 },
    { x: 50, y: -30, z: 40 },
    { x: 50, y: 30, z: 40 },
    { x: -50, y: 30, z: 40 },
    { x: 0, y: -60, z: 0 },
    { x: 0, y: 60, z: 0 }
  ];

  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
    [0, 8], [1, 8], [4, 8], [5, 8],
    [2, 9], [3, 9], [6, 9], [7, 9]
  ];

  let isDragging = false;
  let previousMouseX = 0;

  canvas.onmousedown = (e) => {
    isDragging = true;
    previousMouseX = e.clientX;
    isWireframeRotating = false;
    updateRotationBtn();
  };

  window.onmouseup = () => { isDragging = false; };

  canvas.onmousemove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousMouseX;
    rotationAngle += deltaX * 0.01;
    previousMouseX = e.clientX;
  };

  function project(p, angle) {
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const rotX = p.x * cosA - p.z * sinA;
    const rotZ = p.x * sinA + p.z * cosA;
    const fov = 320;
    const distance = 160;
    const scale = fov / (distance + rotZ);
    return {
      x: canvas.width / 2 + rotX * scale,
      y: canvas.height / 2 + p.y * scale,
      scale
    };
  }

  function renderWireframe() {
    ctx.fillStyle = "#09090b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#18181b";
    ctx.lineWidth = 1;
    const gridSize = 25;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    if (isWireframeRotating) {
      rotationAngle += 0.012;
    }

    const projected = points.map(p => project(p, rotationAngle));

    ctx.strokeStyle = "#ea580c";
    ctx.lineWidth = 1.5;
    edges.forEach(([i, j]) => {
      ctx.beginPath();
      ctx.moveTo(projected[i].x, projected[i].y);
      ctx.lineTo(projected[j].x, projected[j].y);
      ctx.stroke();
    });

    projected.forEach(p => {
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });

    animFrameId = requestAnimationFrame(renderWireframe);
  }

  if (animFrameId) cancelAnimationFrame(animFrameId);
  renderWireframe();
}

window.toggleWireframeRotation = function() {
  isWireframeRotating = !isWireframeRotating;
  updateRotationBtn();
};

window.resetWireframeView = function() {
  rotationAngle = 0;
  isWireframeRotating = true;
  updateRotationBtn();
};

function updateRotationBtn() {
  const textEl = document.getElementById("rotationBtnText");
  if (textEl) {
    textEl.textContent = isWireframeRotating ? "Pausar Rotación" : "Reanudar Rotación";
  }
}
