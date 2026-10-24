import { companiesData } from '../data/companies.js';
import { getLang, getLocalized } from '../i18n.js';

export function renderFloatingConcierge() {
  const lang = getLang();
  const isEs = lang === "es";

  return `
    <!-- FLOATING CONCIERGE LAUNCHER WIDGET -->
    <div class="fixed bottom-16 md:bottom-6 right-6 z-40 max-w-sm" style="position: fixed; bottom: 24px; right: 24px; z-index: 900;">
      <div class="bg-primary-container text-surface-bright border border-outline shadow-2xl p-4 flex items-center justify-between gap-4 cursor-pointer hover:border-secondary transition-all" onclick="window.openConciergeDrawer()">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-secondary flex items-center justify-center shrink-0" style="width: 36px; height: 36px; background-color: var(--secondary); display: flex; align-items: center; justify-content: center;">
            <span class="material-symbols-outlined text-on-secondary text-[20px]" style="color: #ffffff;">smart_toy</span>
          </div>
          <div>
            <div class="font-mono-data text-mono-data font-bold text-surface-bright flex items-center gap-1.5" style="color: #ffffff;">
              <span>CONCIERGE B2B MULTICAPA</span>
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" style="width: 8px; height: 8px; border-radius: 50%; background-color: #10b981; display: inline-block;"></span>
            </div>
            <div class="font-body-sm text-[12px] text-surface-variant leading-tight" style="color: var(--outline-variant);">
              ${isEs ? "Industria, Servicios & Amenidades en 2 min" : "Industry, Services & Amenities in 2 min"}
            </div>
          </div>
        </div>
        <button aria-label="Abrir Asistente" class="bg-surface-bright text-primary hover:bg-secondary hover:text-on-secondary p-1.5 transition-colors" style="background-color: #ffffff; border: none; cursor: pointer; padding: 4px;">
          <span class="material-symbols-outlined text-[18px]">keyboard_arrow_up</span>
        </button>
      </div>
    </div>

    <!-- 3-LAYER INTENT-AWARE SLIDE-OVER CONCIERGE DRAWER -->
    <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-none flex justify-end hidden opacity-0 transition-opacity duration-200" id="conciergeModal" style="position: fixed; inset: 0; background: rgba(0,0,0,0.65); z-index: 9999; display: none; justify-content: flex-end;">
      <div class="w-full max-w-xl bg-background h-full shadow-2xl flex flex-col justify-between border-l border-outline-variant overflow-y-auto transform translate-x-full transition-transform duration-300" id="drawerContent" style="width: 100%; max-width: 580px; background: var(--background); height: 100%; display: flex; flex-direction: column; justify-content: space-between; border-left: 1px solid var(--outline-variant); overflow-y: auto;">
        
        <!-- Drawer Top Bar -->
        <div class="p-6 border-b border-outline-variant flex items-center justify-between bg-surface-container-lowest" style="padding: 1.5rem; border-bottom: 1px solid var(--outline-variant); background: var(--surface-container-lowest); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span class="font-mono-data text-mono-data text-secondary uppercase font-bold tracking-widest block" style="font-family: var(--font-mono); font-size: 11px; color: var(--secondary); font-weight: 700; letter-spacing: 0.1em; display: block; margin-bottom: 2px;">
              ${isEs ? "ASISTENTE INTELIGENTE MULTICAPA" : "MULTI-LAYER AI CONCIERGE"}
            </span>
            <span class="font-headline-sm text-headline-sm text-primary" style="font-family: var(--font-headline); font-size: 20px; font-weight: 600;">
              ${isEs ? "Ecosistema Integral de Parques QRO" : "Querétaro Industrial Park Ecosystem"}
            </span>
          </div>
          <button class="p-2 text-primary hover:text-secondary border border-outline-variant hover:border-primary transition-colors" onclick="window.closeConciergeDrawer()" style="background: transparent; border: 1px solid var(--outline-variant); padding: 6px; cursor: pointer;">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Conversational Canvas -->
        <div class="p-6 sm:p-8 flex-1 flex flex-col justify-start" style="padding: 2rem;">
          
          <div class="flex items-center gap-2 font-mono-data text-mono-data text-on-surface-variant mb-3" style="display: flex; gap: 8px; font-family: var(--font-mono); font-size: 12px; color: var(--on-surface-variant); margin-bottom: 0.75rem;">
            <span class="text-secondary font-bold" style="color: var(--secondary); font-weight: 700;">CAPA DEL ECOSISTEMA</span>
            <span>—</span>
            <span>SELECCIÓN RÁPIDA</span>
          </div>
          
          <h3 class="font-headline-md text-headline-md text-primary font-medium mb-4" style="font-family: var(--font-headline); font-size: 22px; font-weight: 500; line-height: 1.3; margin-bottom: 1rem;">
            ${isEs ? "¿En qué ámbito u operación requiere solución su empresa?" : "Which business layer does your operational need belong to?"}
          </h3>

          <!-- 3 Layer Radio Cards -->
          <div class="space-y-3 mb-6" style="display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1.25rem;">
            
            <!-- Layer 1 -->
            <label class="flex items-start p-3.5 border border-outline-variant bg-surface-container-lowest hover:border-primary cursor-pointer transition-colors group" onclick="window.setConciergeLayer('industrial')" style="display: flex; align-items: flex-start; padding: 0.85rem; border: 1px solid var(--outline-variant); background: var(--surface-container-lowest); cursor: pointer;">
              <input class="text-secondary focus:ring-0 mr-3 mt-1" name="concierge_layer" type="radio" value="industrial" checked style="margin-right: 12px; margin-top: 4px;"/>
              <div>
                <div class="font-body-md font-bold text-primary text-sm">
                  🏭 01. ${isEs ? "Industria & Cadena de Suministro" : "Industrial & Supply Chain"}
                </div>
                <div class="font-mono-data text-xs text-on-surface-variant mt-0.5">
                  ${isEs ? "Maquinado 5 ejes, robótica, inyección de plástico, naves, cuarto limpio" : "5-axis CNC, robotics, plastics, spec plants, cleanroom"}
                </div>
              </div>
            </label>

            <!-- Layer 2 -->
            <label class="flex items-start p-3.5 border border-outline-variant bg-surface-container-lowest hover:border-primary cursor-pointer transition-colors group" onclick="window.setConciergeLayer('services')" style="display: flex; align-items: flex-start; padding: 0.85rem; border: 1px solid var(--outline-variant); background: var(--surface-container-lowest); cursor: pointer;">
              <input class="text-secondary focus:ring-0 mr-3 mt-1" name="concierge_layer" type="radio" value="services" style="margin-right: 12px; margin-top: 4px;"/>
              <div>
                <div class="font-body-md font-bold text-primary text-sm">
                  💼 02. ${isEs ? "Servicios Empresariales & B2B" : "Business & Professional Services"}
                </div>
                <div class="font-mono-data text-xs text-on-surface-variant mt-0.5">
                  ${isEs ? "Despacho fiscal IMMEX, reclutamiento y staffing en planta, custodia satelital" : "IMMEX tax, technical plant staffing, armed convoy escorts"}
                </div>
              </div>
            </label>

            <!-- Layer 3 -->
            <label class="flex items-start p-3.5 border border-outline-variant bg-surface-container-lowest hover:border-primary cursor-pointer transition-colors group" onclick="window.setConciergeLayer('amenities')" style="display: flex; align-items: flex-start; padding: 0.85rem; border: 1px solid var(--outline-variant); background: var(--surface-container-lowest); cursor: pointer;">
              <input class="text-secondary focus:ring-0 mr-3 mt-1" name="concierge_layer" type="radio" value="amenities" style="margin-right: 12px; margin-top: 4px;"/>
              <div>
                <div class="font-body-md font-bold text-primary text-sm">
                  ☕ 03. ${isEs ? "Servicios de Parque & Amenidades" : "Park Services & Amenities"}
                </div>
                <div class="font-mono-data text-xs text-on-surface-variant mt-0.5">
                  ${isEs ? "Comedores industriales Distintivo H, clínica urgencias 24/7, gimnasio, hotel" : "Certified industrial canteens, 24/7 trauma clinic, gym, executive suites"}
                </div>
              </div>
            </label>
          </div>

          <!-- Natural Language Intent Input -->
          <div class="border-t border-outline-variant pt-4 mb-4" style="border-top: 1px solid var(--outline-variant); padding-top: 1rem;">
            <label class="font-label-caps text-label-caps uppercase text-on-surface-variant block mb-1.5" style="font-family: var(--font-body); font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--on-surface-variant); display: block; margin-bottom: 0.35rem;">
              ${isEs ? "Describe en lenguaje natural tu requerimiento:" : "Describe your requirement in natural language:"}
            </label>
            <div class="relative">
              <textarea class="w-full bg-surface-container-lowest border border-outline-variant p-3 font-body-sm text-primary focus:border-secondary focus:ring-0 text-xs sm:text-sm" id="conciergeDetailsInput" oninput="window.interpretConciergeIntent(this.value)" placeholder="${isEs ? "Ej: 'Comida ejecutiva para visita en PIQ', 'Clínica de urgencias en El Marqués', 'Reclutar soldadores', 'Maquinado en titanio'..." : "E.g.: 'Executive lunch near PIQ', 'Urgent medical care El Marqués', 'Recruit welders', '5-axis CNC'..."}" rows="3" style="width: 100%; border: 1px solid var(--outline-variant); background: var(--surface-container-lowest); padding: 0.75rem; font-size: 13px; font-family: var(--font-body); resize: vertical;"></textarea>
            </div>
          </div>

          <!-- Dynamic Intent Match Live Feedback -->
          <div id="conciergeMatchResult" class="p-3 border border-outline-variant bg-surface-container-low transition-all">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="font-mono-data text-xs font-bold text-primary uppercase" id="conciergeMatchLayerLabel">
                01 · INDUSTRIA & MANUFACTURA
              </span>
            </div>
            <div class="font-body-sm text-xs text-on-surface-variant" id="conciergeMatchExplanation">
              ${isEs ? "Interpretando capacidades industriales homologadas en los parques de Querétaro..." : "Matching verified capabilities across Queretaro industrial corridors..."}
            </div>
            <div class="mt-2 pt-2 border-t border-outline-variant flex items-center justify-between" id="conciergePreviewActions">
              <span class="font-mono-data text-[11px] text-secondary font-bold" id="conciergeMatchCount">6 empresas coinciden</span>
              <button onclick="window.viewConciergeMatchesInDirectory()" class="text-xs font-label-caps uppercase text-primary hover:text-secondary underline font-bold">
                ${isEs ? "Ver Coincidencias" : "View Matches"} →
              </button>
            </div>
          </div>

        </div>

        <!-- Drawer Bottom Actions -->
        <div class="p-6 border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between" style="padding: 1.5rem; border-top: 1px solid var(--outline-variant); background: var(--surface-container-lowest); display: flex; align-items: center; justify-content: space-between;">
          <span class="font-mono-data text-mono-data text-on-surface-variant flex items-center gap-1" style="font-family: var(--font-mono); font-size: 12px; display: flex; align-items: center; gap: 4px;">
            <span class="material-symbols-outlined text-[16px]">verified</span> 100% Homologado QRO
          </span>
          <button class="bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase px-6 py-3 transition-colors duration-150 flex items-center gap-2" id="submitConciergeBtn" onclick="window.handleConciergeSubmit()" style="background-color: var(--primary); color: #ffffff; border: none; padding: 0.75rem 1.5rem; font-size: 11px; font-weight: 700; text-transform: uppercase; cursor: pointer; display: flex; align-items: center; gap: 6px;">
            <span>Conectar con Director</span>
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

      </div>
    </div>
  `;
}

let selectedConciergeLayer = "industrial";

window.setConciergeLayer = function(layer) {
  selectedConciergeLayer = layer;
  const textarea = document.getElementById('conciergeDetailsInput');
  window.interpretConciergeIntent(textarea ? textarea.value : '');
};

window.interpretConciergeIntent = function(text) {
  const query = (text || "").toLowerCase();
  const labelEl = document.getElementById("conciergeMatchLayerLabel");
  const expEl = document.getElementById("conciergeMatchExplanation");
  const countEl = document.getElementById("conciergeMatchCount");

  if (!labelEl || !expEl || !countEl) return;

  const amenitiesKeywords = ["comida", "restaurante", "bistro", "catering", "café", "almuerzo", "desayuno", "clínica", "médico", "doctor", "urgencias", "salud", "gimnasio", "gym", "ejercicio", "bienestar", "hotel", "hospedaje", "suites", "dormir", "parque", "amenidad", "convenio", "gafete"];
  const servicesKeywords = ["fiscal", "abogado", "aduanal", "aduanas", "immex", "t-mec", "sat", "anexo 24", "anexo 30", "reclutamiento", "talento", "staffing", "ingenieros", "operadores", "seguridad", "custodia", "patrimonial", "guardias", "repse", "litigio", "pama"];

  let detectedLayer = selectedConciergeLayer;

  if (amenitiesKeywords.some(k => query.includes(k))) {
    detectedLayer = "amenities";
  } else if (servicesKeywords.some(k => query.includes(k))) {
    detectedLayer = "services";
  }

  // Update radio selection visually
  const radio = document.querySelector(`input[name="concierge_layer"][value="${detectedLayer}"]`);
  if (radio) radio.checked = true;

  const matches = companiesData.filter(c => c.layer === detectedLayer);

  if (detectedLayer === "amenities") {
    labelEl.textContent = "03 · SERVICIOS DE PARQUE & AMENIDADES";
    expEl.textContent = query
      ? `Detectamos requerimiento de calidad de vida o servicio en parque: ${query}`
      : "Mostrando comedores con Distintivo H, clínicas 24/7, gimnasios y suites para directivos y personal de parques.";
    countEl.textContent = `${matches.length} servicios de parque listos`;
  } else if (detectedLayer === "services") {
    labelEl.textContent = "02 · SERVICIOS EMPRESARIALES & B2B";
    expEl.textContent = query
      ? `Detectamos requerimiento corporativo especializado: ${query}`
      : "Mostrando consultoría fiscal IMMEX/T-MEC, despachos aduanales, headhunting técnico y seguridad patrimonial.";
    countEl.textContent = `${matches.length} firmas de servicios B2B`;
  } else {
    labelEl.textContent = "01 · INDUSTRIA & CADENA DE SUMINISTRO";
    expEl.textContent = query
      ? `Detectamos requerimiento técnico de manufactura: ${query}`
      : "Mostrando proveedores verificados de maquinado 5 ejes, robótica, inyección de plástico y naves industriales.";
    countEl.textContent = `${matches.length} plantas industriales`;
  }
};

window.viewConciergeMatchesInDirectory = function() {
  const radio = document.querySelector('input[name="concierge_layer"]:checked');
  const layer = radio ? radio.value : "all";
  const textarea = document.getElementById('conciergeDetailsInput');
  const query = textarea ? textarea.value.trim() : "";

  window.closeConciergeDrawer();
  window.location.hash = `#/directory?layer=${layer}${query ? '&q=' + encodeURIComponent(query) : ''}`;
};

window.openConciergeDrawer = function(prefill = '') {
  const modal = document.getElementById('conciergeModal');
  const textarea = document.getElementById('conciergeDetailsInput');
  if (textarea && prefill) {
    textarea.value = prefill;
    window.interpretConciergeIntent(prefill);
  }

  if (modal) {
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.style.opacity = '1';
    }, 10);
  }
};

window.closeConciergeDrawer = function() {
  const modal = document.getElementById('conciergeModal');
  if (modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 200);
  }
};

window.handleConciergeSubmit = function() {
  const btn = document.getElementById('submitConciergeBtn');
  const textarea = document.getElementById('conciergeDetailsInput');
  const radio = document.querySelector('input[name="concierge_layer"]:checked');
  const layer = radio ? radio.value : "industrial";
  const query = textarea ? textarea.value.trim() : "Requerimiento general";

  const matches = companiesData.filter(c => c.layer === layer);
  const targetCompany = matches[0] || companiesData[0];

  if (btn) {
    btn.innerHTML = `<span class="material-symbols-outlined text-[16px] animate-spin">refresh</span> <span>Conectando...</span>`;
    setTimeout(() => {
      btn.innerHTML = `<span>Conectar con Director</span> <span class="material-symbols-outlined text-[16px]">arrow_forward</span>`;
      window.closeConciergeDrawer();
      
      // Directly connect via WhatsApp with top matched director or jump to profile
      const text = encodeURIComponent(`Hola ${targetCompany.contact.director} (${targetCompany.name}), el Concierge de RED EMPRESARIAL QRO me vinculó con su empresa para el siguiente requerimiento: "${query}"`);
      window.open(`https://wa.me/${targetCompany.contact.whatsapp}?text=${text}`, '_blank');
    }, 700);
  }
};
