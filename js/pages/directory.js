import { companiesData } from '../data/companies.js';
import { industriesData } from '../data/industries.js';
import { renderBusinessCard } from '../components/businessCard.js';
import { t, getLang, getLocalized } from '../i18n.js';

let activeFilters = {
  layer: "all",
  industry: "all",
  zone: "all",
  certification: "all",
  search: ""
};

export function renderDirectoryPage() {
  const lang = getLang();
  const isEs = lang === "es";

  const hash = window.location.hash;
  if (hash.includes("?")) {
    const params = new URLSearchParams(hash.split("?")[1]);
    activeFilters.search = params.has("q") ? params.get("q") : "";
    activeFilters.layer = params.has("layer") ? params.get("layer") : "all";
    activeFilters.industry = params.has("industry") ? params.get("industry") : "all";
    activeFilters.zone = params.has("zone") ? params.get("zone") : "all";
    const zoneMap = {
      "Aeropuerto": "Aeropuerto / Colón",
      "Aerotech": "Aeropuerto / Colón",
      "Aerotech / Aeropuerto": "Aeropuerto / Colón",
      "Colón": "Aeropuerto / Colón",
      "Parque Aeroespacial": "Aeropuerto / Colón",
      "Parque Aeroespacial Querétaro": "Aeropuerto / Colón",
      "Parque Innovación Querétaro": "El Marqués",
      "Parque Innovación": "El Marqués",
      "Parque Tecnológico Innovación Querétaro": "El Marqués",
      "PIQ": "PIQ Santa Rosa",
      "Parque Industrial Querétaro": "PIQ Santa Rosa",
      "Parque Industrial Querétaro (PIQ)": "PIQ Santa Rosa",
      "Santa Rosa Jáuregui": "PIQ Santa Rosa",
      "Parque Bernardo Quintana": "Bernardo Quintana",
      "Pq. Bernardo Quintana": "Bernardo Quintana",
      "Parque Industrial Bernardo Quintana": "Bernardo Quintana",
      "Corredor Bernardo Quintana": "Bernardo Quintana",
      "Parque Industrial El Marqués": "El Marqués",
      "Corredor Industrial El Marqués": "El Marqués",
      "El Marqués": "El Marqués",
      "Juriquilla Business Park": "Juriquilla",
      "San Juan": "San Juan del Río",
      "San Juan del Río": "San Juan del Río",
      "Tequisquiapan": "San Juan del Río"
    };
    if (zoneMap[activeFilters.zone]) {
      activeFilters.zone = zoneMap[activeFilters.zone];
    }
  } else {
    activeFilters.layer = "all";
  }

  const countTotal = companiesData.length;
  const countIndustrial = companiesData.filter(c => c.layer === "industrial").length;
  const countServices = companiesData.filter(c => c.layer === "services").length;
  const countAmenities = companiesData.filter(c => c.layer === "amenities").length;

  const filteredCompanies = companiesData.filter(c => {
    if (activeFilters.layer !== "all" && c.layer !== activeFilters.layer) return false;
    if (activeFilters.industry !== "all" && c.industryId !== activeFilters.industry) return false;
    if (activeFilters.zone !== "all" && c.zone !== activeFilters.zone) return false;
    if (activeFilters.certification !== "all") {
      const hasCert = (c.certifications || []).some(cert => cert.name.toLowerCase().includes(activeFilters.certification.toLowerCase())) ||
                      (c.accreditations || []).some(acc => acc.name.toLowerCase().includes(activeFilters.certification.toLowerCase())) ||
                      (c.hygieneCertifications || []).some(hc => hc.name.toLowerCase().includes(activeFilters.certification.toLowerCase()));
      if (!hasCert) return false;
    }
    if (activeFilters.search) {
      const q = activeFilters.search.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchDesc = (c.shortDesc || "").toLowerCase().includes(q) || (c.shortDesc_en || "").toLowerCase().includes(q);
      const matchPos = (c.positioning?.oneLiner || "").toLowerCase().includes(q) || (c.positioning?.oneLiner_en || "").toLowerCase().includes(q);
      const matchTags = (c.tags || []).some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchPos && !matchTags) return false;
    }
    return true;
  });

  return `
    <div class="animate-fade-in">
      
      <!-- Directory Broadsheet Masthead -->
      <div class="border-b border-outline-variant pb-6 mb-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span class="font-mono-data text-mono-data text-secondary uppercase tracking-widest font-semibold block mb-1">
              ${isEs ? "Ecosistema Integral de Parques Industriales · Querétaro" : "Complete Industrial Park Ecosystem · Queretaro"}
            </span>
            <h1 class="font-headline-lg text-headline-lg text-primary tracking-tight font-medium uppercase">
              ${isEs ? "Directorio Homologado de Empresas & Servicios" : "Verified Enterprise & Services Directory"}
            </h1>
            <p class="font-headline-sm text-headline-sm italic text-on-surface-variant mt-1 font-normal max-w-3xl">
              ${isEs ? "El ecosistema completo: manufactura y cadena de suministro, servicios corporativos B2B y amenidades que operan dentro y alrededor de los parques industriales." : "The full ecosystem: industrial manufacturing, corporate business services, and amenities operating inside and around industrial parks."}
            </p>
          </div>
          <div class="flex items-center gap-3">
            <button class="bg-secondary text-on-secondary hover:bg-primary font-label-caps text-label-caps uppercase px-5 py-3 transition-colors flex items-center gap-2" onclick="window.openTypeformModal('matchmaker')">
              <span class="material-symbols-outlined text-[16px]">support_agent</span>
              <span>${isEs ? "Concierge Multicapa" : "Multi-Layer Concierge"}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 3 DISTINCT BUSINESS LAYERS SELECTOR TABS -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-2">
          <span class="font-mono-data text-xs text-secondary font-bold uppercase tracking-wider">
            ${isEs ? "CAPAS DEL ECOSISTEMA EMPRESARIAL" : "BUSINESS ECOSYSTEM LAYERS"}
          </span>
          <span class="font-mono-data text-xs text-on-surface-variant hidden sm:inline">
            ${isEs ? "Filtra por el nivel de servicio requerido" : "Filter by operational business tier"}
          </span>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 border border-outline-variant bg-surface-container-low p-2 shadow-sm font-label-caps text-label-caps uppercase">
          <button onclick="window.setDirectoryLayer('all')" class="p-3 text-left transition-all border ${activeFilters.layer === 'all' ? 'bg-primary text-background border-primary shadow' : 'bg-surface-container-lowest text-primary border-outline-variant hover:border-primary'}">
            <div class="text-[10px] font-mono-data opacity-70 mb-0.5">00 / TODOS</div>
            <div class="font-bold text-xs flex items-center justify-between">
              <span>${isEs ? "Todo el Ecosistema" : "All Ecosystem"}</span>
              <span class="font-mono-data text-xs font-normal">(${countTotal})</span>
            </div>
          </button>

          <button onclick="window.setDirectoryLayer('industrial')" class="p-3 text-left transition-all border ${activeFilters.layer === 'industrial' ? 'bg-primary text-background border-primary shadow' : 'bg-surface-container-lowest text-primary border-outline-variant hover:border-primary'}">
            <div class="text-[10px] font-mono-data opacity-70 mb-0.5">01 / MANUFACTURA</div>
            <div class="font-bold text-xs flex items-center justify-between">
              <span>${isEs ? "Industria & Suministro" : "Industrial Supply"}</span>
              <span class="font-mono-data text-xs font-normal">(${countIndustrial})</span>
            </div>
          </button>

          <button onclick="window.setDirectoryLayer('services')" class="p-3 text-left transition-all border ${activeFilters.layer === 'services' ? 'bg-primary text-background border-primary shadow' : 'bg-surface-container-lowest text-primary border-outline-variant hover:border-primary'}">
            <div class="text-[10px] font-mono-data opacity-70 mb-0.5">02 / CORPORATIVO</div>
            <div class="font-bold text-xs flex items-center justify-between">
              <span>${isEs ? "Servicios B2B" : "Business Services"}</span>
              <span class="font-mono-data text-xs font-normal">(${countServices})</span>
            </div>
          </button>

          <button onclick="window.setDirectoryLayer('amenities')" class="p-3 text-left transition-all border ${activeFilters.layer === 'amenities' ? 'bg-primary text-background border-primary shadow' : 'bg-surface-container-lowest text-primary border-outline-variant hover:border-primary'}">
            <div class="text-[10px] font-mono-data opacity-70 mb-0.5">03 / CALIDAD DE VIDA</div>
            <div class="font-bold text-xs flex items-center justify-between">
              <span>${isEs ? "Parque & Amenidades" : "Park Amenities"}</span>
              <span class="font-mono-data text-xs font-normal">(${countAmenities})</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Advanced Filter Toolbar Deck -->
      <div class="border border-outline-variant bg-surface-container-lowest p-6 mb-8 shadow-sm">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          
          <!-- Search input -->
          <div>
            <label class="font-label-caps text-label-caps uppercase text-on-surface-variant block mb-1.5">
              ${isEs ? "Palabra clave, proceso o amenidad" : "Keyword, capability or amenity"}
            </label>
            <div class="relative flex items-center border border-outline-variant bg-surface-container-low px-3 py-2">
              <span class="material-symbols-outlined text-outline text-[18px] mr-2">search</span>
              <input type="text" id="dir-search-input" value="${activeFilters.search}" placeholder="${isEs ? "Ej. 5 ejes, catering, clínica, IMMEX..." : "E.g. 5-axis, catering, clinic, IMMEX..."}" oninput="window.setDirectoryFilter('search', this.value)" class="w-full bg-transparent border-0 p-0 text-primary text-body-sm placeholder-on-surface-variant focus:ring-0 outline-none" />
            </div>
          </div>

          <!-- Industry Cluster -->
          <div>
            <label class="font-label-caps text-label-caps uppercase text-on-surface-variant block mb-1.5">
              ${isEs ? "Sector / Especialidad" : "Sector / Specialty"}
            </label>
            <select onchange="window.setDirectoryFilter('industry', this.value)" class="w-full border border-outline-variant bg-surface-container-low px-3 py-2 text-body-sm text-primary font-body-sm outline-none cursor-pointer">
              <option value="all" ${activeFilters.industry === "all" ? "selected" : ""}>${isEs ? "Todos los Sectores" : "All Sectors"}</option>
              ${industriesData.map(ind => `
                <option value="${ind.slug}" ${activeFilters.industry === ind.slug ? "selected" : ""}>${getLocalized(ind, 'name')}</option>
              `).join('')}
            </select>
          </div>

          <!-- Industrial Park / Zone -->
          <div>
            <label class="font-label-caps text-label-caps uppercase text-on-surface-variant block mb-1.5">
              ${isEs ? "Parque o Corredor" : "Park or Corridor"}
            </label>
            <select onchange="window.setDirectoryFilter('zone', this.value)" class="w-full border border-outline-variant bg-surface-container-low px-3 py-2 text-body-sm text-primary font-body-sm outline-none cursor-pointer">
              <option value="all" ${activeFilters.zone === "all" ? "selected" : ""}>${isEs ? "Todos los Corredores" : "All Corridors"}</option>
              <option value="Aeropuerto / Colón" ${activeFilters.zone === "Aeropuerto / Colón" ? "selected" : ""}>Aeropuerto / Colón</option>
              <option value="PIQ Santa Rosa" ${activeFilters.zone === "PIQ Santa Rosa" ? "selected" : ""}>Parque Industrial Querétaro (PIQ)</option>
              <option value="El Marqués" ${activeFilters.zone === "El Marqués" ? "selected" : ""}>Parque Industrial El Marqués</option>
              <option value="Bernardo Quintana" ${activeFilters.zone === "Bernardo Quintana" ? "selected" : ""}>Parque Industrial Bernardo Quintana</option>
              <option value="Juriquilla" ${activeFilters.zone === "Juriquilla" ? "selected" : ""}>Juriquilla Business Park</option>
              <option value="San Juan del Río" ${activeFilters.zone === "San Juan del Río" ? "selected" : ""}>San Juan del Río</option>
            </select>
          </div>

          <!-- Certification or Accreditations -->
          <div>
            <label class="font-label-caps text-label-caps uppercase text-on-surface-variant block mb-1.5">
              ${isEs ? "Certificación / Acreditación" : "Certification / License"}
            </label>
            <select onchange="window.setDirectoryFilter('certification', this.value)" class="w-full border border-outline-variant bg-surface-container-low px-3 py-2 text-body-sm text-primary font-body-sm outline-none cursor-pointer">
              <option value="all" ${activeFilters.certification === "all" ? "selected" : ""}>${isEs ? "Cualquier Estándar" : "Any Standard"}</option>
              <option value="AS9100" ${activeFilters.certification === "AS9100" ? "selected" : ""}>AS9100 Rev D (Aeroespacial)</option>
              <option value="IATF" ${activeFilters.certification === "IATF" ? "selected" : ""}>IATF 16949 (Automotriz)</option>
              <option value="ISO 9001" ${activeFilters.certification === "ISO 9001" ? "selected" : ""}>ISO 9001:2015</option>
              <option value="C-TPAT" ${activeFilters.certification === "C-TPAT" ? "selected" : ""}>C-TPAT / BASC / OEA (Seguridad)</option>
              <option value="REPSE" ${activeFilters.certification === "REPSE" ? "selected" : ""}>REPSE STPS (Personal Especializado)</option>
              <option value="Distintivo H" ${activeFilters.certification === "Distintivo H" ? "selected" : ""}>Distintivo H / Inocuidad (Alimentos)</option>
              <option value="COFEPRIS" ${activeFilters.certification === "COFEPRIS" ? "selected" : ""}>Licencia Sanitaria COFEPRIS (Salud)</option>
            </select>
          </div>
        </div>

        <!-- Filter Summary & Reset Strip -->
        <div class="pt-4 border-t border-outline-variant flex items-center justify-between flex-wrap gap-2 text-mono-data font-mono-data text-on-surface-variant">
          <div>
            ${isEs ? "Mostrando" : "Showing"} <strong class="text-primary font-bold">${filteredCompanies.length}</strong> ${isEs ? "empresas y servicios homologados en Querétaro" : "verified businesses & amenities in Queretaro"}
          </div>
          <button class="text-secondary hover:underline font-semibold flex items-center gap-1" onclick="window.resetDirectoryFilters()">
            <span class="material-symbols-outlined text-[14px]">refresh</span>
            <span>${isEs ? "Restablecer Filtros" : "Reset Filters"}</span>
          </button>
        </div>
      </div>

      <!-- Companies Grid -->
      ${filteredCompanies.length > 0 ? `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          ${filteredCompanies.map(company => renderBusinessCard(company)).join('')}
        </div>
      ` : `
        <div class="border border-outline-variant bg-surface-container-lowest p-12 text-center">
          <div class="w-12 h-12 bg-surface-container-high mx-auto flex items-center justify-center mb-4">
            <span class="material-symbols-outlined text-[24px] text-secondary">search_off</span>
          </div>
          <h3 class="font-headline-sm text-headline-sm text-primary mb-2">${isEs ? "Sin resultados para estos filtros" : "No results for these filters"}</h3>
          <p class="font-body-sm text-body-sm text-on-surface-variant max-w-md mx-auto mb-6">
            ${isEs ? "¿No encuentra la capacidad, servicio o amenidad requerida? Nuestro Concierge B2B puede buscar opciones dentro de la red del Bajío." : "Can't find the required capability or amenity? Our B2B Concierge can search verified options."}
          </p>
          <button class="bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase px-6 py-3 transition-colors inline-flex items-center gap-2" onclick="window.openTypeformModal('matchmaker')">
            <span class="material-symbols-outlined text-[16px]">bolt</span>
            <span>${isEs ? "Consultar Concierge Multicapa" : "Consult Multi-Layer Concierge"}</span>
          </button>
        </div>
      `}

    </div>
  `;
}

window.setDirectoryLayer = function(layer) {
  activeFilters.layer = layer;
  if (layer === "all") {
    window.location.hash = "#/directory";
  } else {
    window.location.hash = `#/directory?layer=${layer}`;
  }
};

window.setDirectoryFilter = function(key, val) {
  activeFilters[key] = val;
  const appContainer = document.getElementById("app-main");
  if (appContainer) {
    appContainer.innerHTML = renderDirectoryPage();
  }
};

window.resetDirectoryFilters = function() {
  activeFilters = { layer: "all", industry: "all", zone: "all", certification: "all", search: "" };
  window.location.hash = "#/directory";
};
