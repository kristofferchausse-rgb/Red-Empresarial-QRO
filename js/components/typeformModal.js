import { icon } from './icons.js';
import { companiesData } from '../data/companies.js';
import { showToast } from './socialShare.js';
import { getLang, getLocalized, t } from '../i18n.js';

let currentModalState = {
  type: null,
  step: 1,
  totalSteps: 4,
  answers: {},
  context: {}
};

export function initTypeformModal() {
  let modalBackdrop = document.getElementById("tf-modal-backdrop");
  if (!modalBackdrop) {
    modalBackdrop = document.createElement("div");
    modalBackdrop.id = "tf-modal-backdrop";
    modalBackdrop.className = "tf-modal-backdrop";
    modalBackdrop.innerHTML = `
      <div class="tf-modal-container" id="tf-modal-container">
        <div class="tf-modal-header">
          <div class="tf-progress-wrap">
            <div class="tf-progress-bar" id="tf-progress-bar"></div>
          </div>
          <div class="tf-step-count" id="tf-step-count">Paso 1 de 4</div>
          <button class="tf-close-btn" onclick="window.closeTypeformModal()" aria-label="Cerrar">
            ${icon("x", "", 18)}
          </button>
        </div>
        <div class="tf-modal-body" id="tf-modal-body">
          <!-- Dynamic Step Content Injected Here -->
        </div>
        <div class="tf-modal-footer" id="tf-modal-footer">
          <div class="tf-keyboard-hint">
            <span id="tf-hint-text">Tip: Selecciona una opción o presiona <kbd>Enter ↵</kbd></span>
          </div>
          <div class="tf-footer-actions">
            <button class="btn btn-outline btn-sm" id="tf-prev-btn" onclick="window.prevTypeformStep()">
              ${icon("chevron-left", "", 16)} <span id="tf-prev-text">Atrás</span>
            </button>
            <button class="btn btn-primary btn-sm" id="tf-next-btn" onclick="window.nextTypeformStep()">
              <span id="tf-next-text">Continuar</span> ${icon("arrow-right", "", 16)}
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalBackdrop);

    // Close on backdrop click
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        window.closeTypeformModal();
      }
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!modalBackdrop.classList.contains("active")) return;
      if (e.key === "Escape") {
        window.closeTypeformModal();
      } else if (e.key === "Enter" && !e.shiftKey) {
        if (document.activeElement && document.activeElement.tagName === "TEXTAREA") return;
        e.preventDefault();
        window.nextTypeformStep();
      }
    });
  }
}

window.openTypeformModal = function(type = "matchmaker", context = {}) {
  initTypeformModal();
  currentModalState = {
    type,
    step: 1,
    totalSteps: type === "matchmaker" ? 4 : type === "rfq" ? 4 : 3,
    answers: {},
    context
  };

  const backdrop = document.getElementById("tf-modal-backdrop");
  backdrop.classList.add("active");
  document.body.style.overflow = "hidden";
  renderCurrentTypeformStep();
};

window.closeTypeformModal = function() {
  const backdrop = document.getElementById("tf-modal-backdrop");
  if (backdrop) {
    backdrop.classList.remove("active");
    document.body.style.overflow = "";
  }
};

window.selectTypeformChoice = function(key, value, autoAdvance = true) {
  currentModalState.answers[key] = value;
  renderCurrentTypeformStep();
  if (autoAdvance) {
    setTimeout(() => {
      window.nextTypeformStep();
    }, 280);
  }
};

window.prevTypeformStep = function() {
  if (currentModalState.step > 1) {
    currentModalState.step--;
    renderCurrentTypeformStep();
  }
};

window.nextTypeformStep = function() {
  const inputEl = document.querySelector("#tf-modal-body input[name], #tf-modal-body textarea[name]");
  if (inputEl) {
    currentModalState.answers[inputEl.name] = inputEl.value;
  }

  if (currentModalState.step <= currentModalState.totalSteps) {
    currentModalState.step++;
    renderCurrentTypeformStep();
  }
};

function renderCurrentTypeformStep() {
  const body = document.getElementById("tf-modal-body");
  const progressBar = document.getElementById("tf-progress-bar");
  const stepCount = document.getElementById("tf-step-count");
  const prevBtn = document.getElementById("tf-prev-btn");
  const nextBtn = document.getElementById("tf-next-btn");
  const nextText = document.getElementById("tf-next-text");
  const prevText = document.getElementById("tf-prev-text");
  const hintText = document.getElementById("tf-hint-text");
  const footer = document.getElementById("tf-modal-footer");
  const lang = getLang();

  const { type, step, totalSteps, answers, context } = currentModalState;

  // Update Progress
  const progressPercent = Math.min(100, (step / totalSteps) * 100);
  progressBar.style.width = `${progressPercent}%`;
  
  if (lang === "es") {
    stepCount.textContent = step <= totalSteps ? `Paso ${step} de ${totalSteps}` : "Completado";
    prevText.textContent = "Atrás";
    nextText.textContent = step === totalSteps ? "Finalizar" : "Continuar";
    hintText.innerHTML = `Tip: Selecciona una opción o presiona <kbd>Enter ↵</kbd>`;
  } else {
    stepCount.textContent = step <= totalSteps ? `Step ${step} of ${totalSteps}` : "Complete";
    prevText.textContent = "Back";
    nextText.textContent = step === totalSteps ? "Finish" : "Continue";
    hintText.innerHTML = `Tip: Select an option or press <kbd>Enter ↵</kbd>`;
  }

  prevBtn.style.visibility = step > 1 && step <= totalSteps ? "visible" : "hidden";
  footer.style.display = step > totalSteps ? "none" : "flex";

  if (type === "matchmaker") {
    renderMatchmakerStep(body, step, answers, nextText, footer, lang);
  } else if (type === "rfq") {
    renderRfqStep(body, step, answers, context, nextText, footer, lang);
  } else if (type === "post-opportunity") {
    renderPostOpportunityStep(body, step, answers, nextText, footer, lang);
  } else if (type === "join-community") {
    renderJoinCommunityStep(body, step, answers, nextText, footer, lang);
  }
}

// 1. MATCHMAKER CONCIERGE FLOW (Bilingual)
function renderMatchmakerStep(container, step, answers, nextText, footer, lang) {
  const isEs = lang === "es";

  if (step === 1) {
    container.innerHTML = `
      <div class="tf-step-slide active">
        <div class="tf-step-tag">${icon("sparkles", "", 14)} ${isEs ? "Asistente Inteligente de Vinculación B2B" : "Intelligent B2B Matchmaker"}</div>
        <h2 class="tf-question-title">${isEs ? "¿En qué ámbito u operación requiere solución su empresa en Querétaro?" : "Which business layer does your company need in Querétaro?"}</h2>
        <p class="tf-question-desc">${isEs ? "Operamos a través de los tres niveles del ecosistema de parques industriales:" : "We operate across all three business layers in industrial parks:"}</p>
        
        <div class="tf-choices-grid">
          ${[
            { key: "A", label: isEs ? "🏭 Industria & Cadena de Suministro" : "🏭 Industrial & Supply Chain", sub: isEs ? "Mecanizado CNC 5 ejes, robótica, inyección de plástico, naves y cuartos limpios" : "5-axis CNC, robotics, injection molding, spec plants, cleanrooms", val: "industrial" },
            { key: "B", label: isEs ? "💼 Servicios Empresariales & Corporativos" : "💼 Business & Professional Services", sub: isEs ? "Consultoría fiscal IMMEX, reclutamiento en planta, custodia satelital y litigio" : "IMMEX tax advisory, technical plant staffing, armed convoy escort", val: "services" },
            { key: "C", label: isEs ? "☕ Servicios de Parque & Amenidades" : "☕ Park Services & Amenities", sub: isEs ? "Comedores Distintivo H, clínica urgencias 24/7, gimnasio corporativo y hospedaje" : "Certified industrial canteens, 24/7 urgent care clinics, gyms, executive suites", val: "amenities" }
          ].map(c => `
            <div class="tf-choice-card ${answers.layer === c.val ? 'selected' : ''}" onclick="window.selectTypeformChoice('layer', '${c.val}')">
              <div class="tf-choice-key">${c.key}</div>
              <div>
                <div class="tf-choice-label">${c.label}</div>
                <div class="tf-choice-sub">${c.sub}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (step === 2) {
    container.innerHTML = `
      <div class="tf-step-slide active">
        <div class="tf-step-tag">${icon("map-pin", "", 14)} ${isEs ? "Zona / Parque Industrial" : "Target Location"}</div>
        <h2 class="tf-question-title">${isEs ? "¿En qué parque o corredor industrial prefieres la operación?" : "Where in the Querétaro industrial corridor should the provider operate?"}</h2>
        <p class="tf-question-desc">${isEs ? "Selecciona el parque industrial para optimizar tiempos de respuesta logística o proximidad a planta." : "Select preferred industrial park or corridor."}</p>
        
        <div class="tf-choices-grid">
          ${[
            { key: "A", label: isEs ? "Parque Industrial Querétaro (PIQ Santa Rosa)" : "Querétaro Industrial Park (PIQ)", val: "PIQ Santa Rosa" },
            { key: "B", label: isEs ? "Parque Industrial El Marqués / Bernardo Quintana" : "El Marqués / Bernardo Quintana Parks", val: "El Marqués" },
            { key: "C", label: isEs ? "Parque Aeroespacial Querétaro / Colón" : "Aerospace Park / Colón Corridor", val: "Aeropuerto" },
            { key: "D", label: isEs ? "Corredor Juriquilla / Carretera 57" : "Juriquilla / Highway 57 Corridor", val: "Juriquilla" },
            { key: "E", label: isEs ? "Cualquier Parque Industrial en Querétaro" : "Any Industrial Park in Querétaro", val: "Any" }
          ].map(c => `
            <div class="tf-choice-card ${answers.location === c.val ? 'selected' : ''}" onclick="window.selectTypeformChoice('location', '${c.val}')">
              <div class="tf-choice-key">${c.key}</div>
              <div>
                <div class="tf-choice-label">${c.label}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (step === 3) {
    container.innerHTML = `
      <div class="tf-step-slide active">
        <div class="tf-step-tag">${icon("shield-check", "", 14)} ${isEs ? "Calidad, Acreditación o Convenio" : "Quality, Certification or Perk"}</div>
        <h2 class="tf-question-title">${isEs ? "¿Qué certificación o estándar requiere para este servicio?" : "What standard or corporate perk is required?"}</h2>
        <p class="tf-question-desc">${isEs ? "Filtramos únicamente entidades acreditadas y verificadas que cumplan con la normatividad." : "We filter verified providers meeting required regulations."}</p>
        
        <div class="tf-choices-grid">
          ${[
            { key: "A", label: isEs ? "AS9100 Rev D / IATF 16949 / ISO 9001 (Manufactura)" : "AS9100 / IATF / ISO (Manufacturing)", val: "ISO" },
            { key: "B", label: isEs ? "REPSE STPS / Registro Oficial (Personal Especializado)" : "REPSE STPS Registration (Staffing)", val: "REPSE" },
            { key: "C", label: isEs ? "Distintivo H / COFEPRIS / Punto Limpio (Alimentos y Salud)" : "Distintivo H / COFEPRIS (Food & Health)", val: "Distintivo H" },
            { key: "D", label: isEs ? "C-TPAT / OEA / BASC (Seguridad en Cadena de Suministro)" : "C-TPAT / OEA / BASC (Supply Chain Security)", val: "CTPAT" },
            { key: "E", label: isEs ? "Sin certificación estricta / Abierto a propuestas" : "No strict requirement / Open to options", val: "None" }
          ].map(c => `
            <div class="tf-choice-card ${answers.certification === c.val ? 'selected' : ''}" onclick="window.selectTypeformChoice('certification', '${c.val}')">
              <div class="tf-choice-key">${c.key}</div>
              <div>
                <div class="tf-choice-label">${c.label}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (step === 4) {
    nextText.textContent = isEs ? "Ver Entidades Coincidentes" : "Find Matches";
    container.innerHTML = `
      <div class="tf-step-slide active">
        <div class="tf-step-tag">${icon("clock", "", 14)} ${isEs ? "Detalles del Requerimiento" : "Scope & Contact"}</div>
        <h2 class="tf-question-title">${isEs ? "Describe brevemente tu necesidad o proyecto" : "Briefly describe your project or requirement"}</h2>
        <p class="tf-question-desc">${isEs ? "Indica volúmenes, fechas de inicio, número de colaboradores o especificaciones." : "Provide brief details for priority matching."}</p>
        
        <div style="margin-bottom: 1.5rem;">
          <textarea class="tf-textarea-field" name="projectDetails" placeholder="${isEs ? "Ej: Requiero comedor industrial para 400 personas en PIQ, o maquilado CNC en titanio..." : "Example: Need industrial canteen for 400 workers in PIQ, or 5-axis CNC in titanium..."}">${answers.projectDetails || ''}</textarea>
        </div>

        <div>
          <input type="text" class="tf-input-field" name="contactEmail" placeholder="${isEs ? "Tu correo corporativo o WhatsApp (ej: compras@planta.com)" : "Your corporate email or WhatsApp"}" value="${answers.contactEmail || ''}" style="font-size: 1.05rem;" />
        </div>
      </div>
    `;
  } else {
    // RESULTS SCREEN
    const selectedLayer = answers.layer || "industrial";
    let matches = companiesData.filter(c => c.layer === selectedLayer);
    if (answers.location && answers.location !== "Any") {
      const locationFiltered = matches.filter(c => c.zone.toLowerCase().includes(answers.location.toLowerCase()) || answers.location.toLowerCase().includes(c.zone.toLowerCase()));
      if (locationFiltered.length > 0) matches = locationFiltered;
    }

    const displayedMatches = matches.slice(0, 4);

    container.innerHTML = `
      <div class="tf-step-slide active" style="text-align: center;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(13, 148, 136, 0.12); color: var(--brand-emerald-verified); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
          ${icon("check", "", 28)}
        </div>
        <h2 class="tf-question-title" style="margin-bottom: 0.5rem;">
          ${isEs ? `¡Encontramos ${displayedMatches.length} Opciones Homologadas!` : `We Found ${displayedMatches.length} Verified Options!`}
        </h2>
        <p class="tf-question-desc" style="margin: 0 auto 1.75rem;">
          ${isEs ? "Empresas y servicios verificados en Querétaro correspondientes a la capa seleccionada:" : "Verified businesses in Querétaro matching your selected ecosystem layer:"}
        </p>

        <div class="tf-results-grid" style="text-align: left;">
          ${displayedMatches.map(company => `
            <div class="tf-result-item">
              <div class="tf-result-info">
                <img src="${company.logo}" alt="${company.name}" class="tf-result-logo" />
                <div>
                  <div class="tf-result-name">${company.name}</div>
                  <div class="tf-result-meta">${getLocalized(company, 'industryName')} • ${company.zone}</div>
                </div>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <a href="#/business/${company.slug}" class="btn btn-outline btn-sm" onclick="window.closeTypeformModal()">
                  ${company.layer === 'amenities' ? (isEs ? "Ver Amenidad" : "View Amenity") : (isEs ? "Ver Mini-Sitio" : "View Mini-Site")}
                </a>
                <button class="btn btn-whatsapp btn-sm" onclick="window.openQuickWhatsApp('${company.contact.whatsapp}', '${company.name}')">
                  ${icon("message-circle", "", 14)} WhatsApp
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="margin-top: 2rem;">
          <button class="btn btn-primary" onclick="window.closeTypeformModal(); window.location.hash = '#/directory?layer=${selectedLayer}'">
            ${isEs ? "Ver Todo en el Directorio" : "View All in Directory"} ${icon("arrow-right", "", 16)}
          </button>
        </div>
      </div>
    `;
  }
}

// 2. INTERACTIVE RFQ STEP (Bilingual)
function renderRfqStep(container, step, answers, context, nextText, footer, lang) {
  const isEs = lang === "es";
  const company = companiesData.find(c => c.id === context.companyId) || companiesData[0];

  if (step === 1) {
    container.innerHTML = `
      <div class="tf-step-slide active">
        <div class="tf-step-tag">${icon("sparkles", "", 14)} ${isEs ? "Solicitud de Cotización (RFQ)" : "Request for Quote (RFQ)"}</div>
        <h2 class="tf-question-title">${isEs ? `Solicitando Cotización a ${company.name}` : `Requesting Quote from ${company.name}`}</h2>
        <p class="tf-question-desc">${isEs ? "¿Qué producto, maquinado o servicio necesitas cotizar?" : "What product or capability do you need quoted?"}</p>
        
        <div style="margin-bottom: 1.5rem;">
          <textarea class="tf-textarea-field" name="rfqScope" placeholder="${isEs ? "Describe números de parte, aleaciones, tolerancias o dimensiones..." : "Describe part numbers, dimensions, material alloy, or scope..."}">${answers.rfqScope || ''}</textarea>
        </div>
      </div>
    `;
  } else if (step === 2) {
    container.innerHTML = `
      <div class="tf-step-slide active">
        <div class="tf-step-tag">${icon("clock", "", 14)} ${isEs ? "Volumen y Tiempos de Entrega" : "Target Volume"}</div>
        <h2 class="tf-question-title">${isEs ? "¿Cuál es el volumen estimado de piezas o periodicidad?" : "What are your estimated volume & delivery terms?"}</h2>
        <p class="tf-question-desc">${isEs ? "Selecciona el tamaño aproximado de lote o servicio requerido." : "Select approximate lot size."}</p>
        
        <div class="tf-choices-grid">
          ${[
            { key: "A", label: isEs ? "Prototipo / Lote Único (<100 piezas)" : "Prototype (<100 units)", val: "Prototype" },
            { key: "B", label: isEs ? "Lote Mediano (100 - 5,000 piezas)" : "Medium Batch (100 - 5,000 units)", val: "Medium" },
            { key: "C", label: isEs ? "Alto Volumen / Contrato Anual (>5,000 pzas)" : "High Volume (>5,000 units)", val: "High Volume" },
            { key: "D", label: isEs ? "Servicio Llave en Mano para Planta" : "Turnkey Facility Service", val: "Project" }
          ].map(c => `
            <div class="tf-choice-card ${answers.volume === c.val ? 'selected' : ''}" onclick="window.selectTypeformChoice('volume', '${c.val}')">
              <div class="tf-choice-key">${c.key}</div>
              <div><div class="tf-choice-label">${c.label}</div></div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (step === 3) {
    container.innerHTML = `
      <div class="tf-step-slide active">
        <div class="tf-step-tag">${icon("file-text", "", 14)} ${isEs ? "Datos de Contacto" : "Contact Details"}</div>
        <h2 class="tf-question-title">${isEs ? `¿A dónde debe enviar ${company.name} la propuesta formal?` : `Where should ${company.name} send the proposal?`}</h2>
        <p class="tf-question-desc">${isEs ? "Ingresa los datos del responsable de compras o ingeniería." : "Enter your business contact information."}</p>
        
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <input type="text" class="tf-input-field" name="contactName" placeholder="${isEs ? "Nombre Completo y Empresa" : "Your Full Name & Company"}" value="${answers.contactName || ''}" />
          <input type="email" class="tf-input-field" name="contactEmail" placeholder="${isEs ? "Correo Electrónico Corporativo" : "Corporate Email Address"}" value="${answers.contactEmail || ''}" />
          <input type="tel" class="tf-input-field" name="contactPhone" placeholder="${isEs ? "Teléfono Directo / WhatsApp" : "Direct Phone / WhatsApp"}" value="${answers.contactPhone || ''}" />
        </div>
      </div>
    `;
  } else if (step === 4) {
    nextText.textContent = isEs ? "Enviar Cotización" : "Submit RFQ";
    container.innerHTML = `
      <div class="tf-step-slide active">
        <div class="tf-step-tag">${icon("check", "", 14)} ${isEs ? "Confirmación de Envío" : "Review"}</div>
        <h2 class="tf-question-title">${isEs ? `Listo para despachar a ${company.contact.director}` : `Ready to dispatch to ${company.contact.director}`}</h2>
        <p class="tf-question-desc">${isEs ? "La solicitud se enviará con estatus prioritario al equipo comercial de la planta." : "Your request will be delivered with priority status directly to the plant."}</p>

        <div style="background: var(--bg-subtle); padding: 1.25rem; border-radius: var(--radius-md); border-left: 3px solid var(--brand-terracotta);">
          <div style="font-weight: 700; margin-bottom: 0.35rem;">${isEs ? "Resumen de Solicitud:" : "Summary:"}</div>
          <p style="font-size: 0.9rem; margin-bottom: 0.5rem;">${answers.rfqScope || (isEs ? 'Requerimientos de manufactura' : 'Manufacturing requirements')}</p>
          <div style="font-size: 0.8rem; color: var(--text-muted);">${company.name} (${company.location})</div>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="tf-step-slide active" style="text-align: center;">
        <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(13, 148, 136, 0.12); color: var(--brand-emerald-verified); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
          ${icon("check", "", 32)}
        </div>
        <h2 class="tf-question-title">${isEs ? "¡RFQ Despachada con Éxito!" : "RFQ Successfully Dispatched!"}</h2>
        <p class="tf-question-desc" style="margin: 0 auto 1.5rem;">${isEs ? `Se ha enviado la solicitud. También puedes contactar directamente a ${company.contact.director} por WhatsApp:` : `Confirmation sent. You can also connect via WhatsApp with ${company.contact.director}:`}</p>
        
        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <button class="btn btn-whatsapp" onclick="window.openQuickWhatsApp('${company.contact.whatsapp}', '${company.name}')">
            ${icon("message-circle", "", 18)} WhatsApp Prioritario
          </button>
          <button class="btn btn-primary" onclick="window.closeTypeformModal()">
            ${isEs ? "Regresar al Perfil" : "Return to Profile"}
          </button>
        </div>
      </div>
    `;
  }
}

// 3. POST OPPORTUNITY STEP (Bilingual)
function renderPostOpportunityStep(container, step, answers, nextText, footer, lang) {
  const isEs = lang === "es";

  if (step === 1) {
    container.innerHTML = `
      <div class="tf-step-slide active">
        <div class="tf-step-tag">${icon("sparkles", "", 14)} ${isEs ? "Publicar Oportunidad de Negocio" : "Post Opportunity"}</div>
        <h2 class="tf-question-title">${isEs ? "¿Qué tipo de oportunidad deseas publicar en Querétaro?" : "What type of opportunity are you posting?"}</h2>
        <p class="tf-question-desc">${isEs ? "Selecciona la categoría para notificar a los proveedores y socios correspondientes." : "Select the category."}</p>
        
        <div class="tf-choices-grid">
          ${[
            { key: "A", label: isEs ? "Se Busca Proveedor / Compras" : "I Need / Looking for Supplier", sub: isEs ? "Adquisición de piezas, materias primas o servicios" : "Source parts or raw materials", val: "need" },
            { key: "B", label: isEs ? "Capacidad Disponible de Maquinaria" : "Available Capacity", sub: isEs ? "Horas abiertas de CNC, naves o líneas" : "Offer open machine time", val: "offer" },
            { key: "C", label: isEs ? "Solicitud Formal de Cotización (RFQ)" : "Formal Request for Quote (RFQ)", sub: isEs ? "Licitación con lote, presupuesto y fecha límite" : "Tender with budget & deadline", val: "rfq" },
            { key: "D", label: isEs ? "Alianza Estratégica / Consorcio" : "Strategic Consortium", sub: isEs ? "Asociación para licitaciones de gran escala" : "Partner for major bids", val: "partner" }
          ].map(c => `
            <div class="tf-choice-card ${answers.oppType === c.val ? 'selected' : ''}" onclick="window.selectTypeformChoice('oppType', '${c.val}')">
              <div class="tf-choice-key">${c.key}</div>
              <div>
                <div class="tf-choice-label">${c.label}</div>
                <div class="tf-choice-sub">${c.sub}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (step === 2) {
    container.innerHTML = `
      <div class="tf-step-slide active">
        <div class="tf-step-tag">${icon("file-text", "", 14)} ${isEs ? "Detalles de la Oportunidad" : "Opportunity Details"}</div>
        <h2 class="tf-question-title">${isEs ? "Título y Especificaciones del Requerimiento" : "Title & Specifications"}</h2>
        <p class="tf-question-desc">${isEs ? "Sé específico con respecto a tolerancias, materiales y certificaciones obligatorias." : "Be clear about requirements and certifications."}</p>
        
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
          <input type="text" class="tf-input-field" name="oppTitle" placeholder="${isEs ? "Título claro (ej: Se busca taller de maquinado 5 ejes en El Marqués)" : "Clear title (e.g. Seeking 5-Axis CNC Supplier in El Marqués)"}" value="${answers.oppTitle || ''}" />
          <textarea class="tf-textarea-field" name="oppDesc" placeholder="${isEs ? "Descripción detallada, lote mensual, tolerancias requeridas..." : "Full details, tolerances, monthly quantities..."}">${answers.oppDesc || ''}</textarea>
        </div>
      </div>
    `;
  } else if (step === 3) {
    nextText.textContent = isEs ? "Publicar Oportunidad" : "Publish Opportunity";
    container.innerHTML = `
      <div class="tf-step-slide active">
        <div class="tf-step-tag">${icon("clock", "", 14)} ${isEs ? "Presupuesto y Contacto" : "Budget & Contact"}</div>
        <h2 class="tf-question-title">${isEs ? "Presupuesto estimado y datos de contacto" : "Set estimated budget & contact info"}</h2>
        <p class="tf-question-desc">${isEs ? "Ingresa tu información para que los miembros interesados envíen sus propuestas." : "Provide contact details."}</p>
        
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <input type="text" class="tf-input-field" name="oppBudget" placeholder="${isEs ? "Presupuesto Estimado (ej: $50,000 - $80,000 USD)" : "Estimated Budget (e.g. $50,000 - $80,000 USD)"}" value="${answers.oppBudget || ''}" />
          <input type="text" class="tf-input-field" name="oppCompany" placeholder="${isEs ? "Empresa y Cargo" : "Your Company & Title"}" value="${answers.oppCompany || ''}" />
          <input type="email" class="tf-input-field" name="oppEmail" placeholder="${isEs ? "Correo Electrónico para Recepción de Propuestas" : "Business Email"}" value="${answers.oppEmail || ''}" />
        </div>
      </div>
    `;
  } else {
    showToast(isEs ? "¡Oportunidad publicada en la red de Querétaro!" : "Opportunity published live!", "success");
    container.innerHTML = `
      <div class="tf-step-slide active" style="text-align: center;">
        <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(13, 148, 136, 0.12); color: var(--brand-emerald-verified); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
          ${icon("check", "", 32)}
        </div>
        <h2 class="tf-question-title">${isEs ? "¡Oportunidad Publicada en Vivo!" : "Opportunity Published Live!"}</h2>
        <p class="tf-question-desc" style="margin: 0 auto 1.5rem;">${isEs ? "Tu requerimiento ha sido notificado a las empresas verificadas de Querétaro en tu sector." : "Your post has been broadcast to verified Querétaro members."}</p>
        <button class="btn btn-primary" onclick="window.closeTypeformModal(); window.location.hash = '#/opportunities'">
          ${isEs ? "Ver en Tablero de Oportunidades" : "View on Board"} ${icon("arrow-right", "", 16)}
        </button>
      </div>
    `;
  }
}

// 4. JOIN COMMUNITY STEP (Bilingual)
function renderJoinCommunityStep(container, step, answers, nextText, footer, lang) {
  const isEs = lang === "es";

  if (step === 1) {
    container.innerHTML = `
      <div class="tf-step-slide active">
        <div class="tf-step-tag">${icon("sparkles", "", 14)} ${isEs ? "Registro de Membresía" : "Membership Application"}</div>
        <h2 class="tf-question-title">${isEs ? "Solicita el Mini-Sitio para tu Empresa en Querétaro" : "Claim Your Querétaro Business Mini-Site"}</h2>
        <p class="tf-question-desc">${isEs ? "Únete al ecosistema curado de empresas aeroespaciales, automotrices y de automatización en Querétaro." : "Join the curated ecosystem of industrial leaders in Querétaro."}</p>
        
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <input type="text" class="tf-input-field" name="joinCompanyName" placeholder="${isEs ? "Razón Social / Nombre Comercial" : "Company Legal / Commercial Name"}" value="${answers.joinCompanyName || ''}" />
          <input type="text" class="tf-input-field" name="joinPositioning" placeholder="${isEs ? "Posicionamiento en 1 línea (ej: Maquinado CNC de 5 Ejes AS9100)" : "1-Line Positioning"}" value="${answers.joinPositioning || ''}" />
        </div>
      </div>
    `;
  } else if (step === 2) {
    container.innerHTML = `
      <div class="tf-step-slide active">
        <div class="tf-step-tag">${icon("map-pin", "", 14)} ${isEs ? "Ubicación de Planta" : "Location"}</div>
        <h2 class="tf-question-title">${isEs ? "¿En qué parque industrial u oficina se ubica tu empresa?" : "Where are your plant or corporate offices located?"}</h2>
        <p class="tf-question-desc">${isEs ? "Selecciona el corredor industrial en Querétaro." : "Select the industrial corridor."}</p>
        
        <div class="tf-choices-grid">
          ${[
            { key: "A", label: "Parque Industrial Querétaro (PIQ)", val: "PIQ" },
            { key: "B", label: "Parque Aeroespacial Querétaro / Colón", val: "Aeroespacial" },
            { key: "C", label: "Parque Industrial El Marqués / Quintana", val: "El Marqués" },
            { key: "D", label: "Parque Industrial Balvanera / Corregidora", val: "Balvanera" },
            { key: "E", label: "Corredor Corporativo (Juriquilla / Centro Sur)", val: "Corporate" }
          ].map(c => `
            <div class="tf-choice-card ${answers.joinPark === c.val ? 'selected' : ''}" onclick="window.selectTypeformChoice('joinPark', '${c.val}')">
              <div class="tf-choice-key">${c.key}</div>
              <div><div class="tf-choice-label">${c.label}</div></div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (step === 3) {
    nextText.textContent = isEs ? "Enviar Solicitud" : "Submit Application";
    container.innerHTML = `
      <div class="tf-step-slide active">
        <div class="tf-step-tag">${icon("users", "", 14)} ${isEs ? "Contacto Ejecutivo" : "Executive Contact"}</div>
        <h2 class="tf-question-title">${isEs ? "¿Quién es el contacto ejecutivo responsable?" : "Who is the primary executive contact?"}</h2>
        <p class="tf-question-desc">${isEs ? "Nuestro equipo de vinculación te contactará en menos de 24 horas para verificar certificaciones." : "Our onboarding team will contact you within 24 hours."}</p>
        
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <input type="text" class="tf-input-field" name="execName" placeholder="${isEs ? "Nombre Completo y Cargo" : "Full Name & Title"}" value="${answers.execName || ''}" />
          <input type="email" class="tf-input-field" name="execEmail" placeholder="${isEs ? "Correo Electrónico Corporativo" : "Corporate Email"}" value="${answers.execEmail || ''}" />
          <input type="tel" class="tf-input-field" name="execWhatsApp" placeholder="${isEs ? "WhatsApp para Vinculación Directa" : "WhatsApp Number"}" value="${answers.execWhatsApp || ''}" />
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="tf-step-slide active" style="text-align: center;">
        <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(13, 148, 136, 0.12); color: var(--brand-emerald-verified); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
          ${icon("check", "", 32)}
        </div>
        <h2 class="tf-question-title">${isEs ? "¡Solicitud Recibida!" : "Application Received!"}</h2>
        <p class="tf-question-desc" style="margin: 0 auto 1.5rem;">${isEs ? "El borrador de tu mini-sitio modular está en proceso. Nos pondremos en contacto para validar credenciales y publicar tu vitrina B2B." : "Your business mini-site draft is being prepared."}</p>
        <button class="btn btn-primary" onclick="window.closeTypeformModal()">
          ${isEs ? "Explorar Plataforma" : "Explore Platform"} ${icon("arrow-right", "", 16)}
        </button>
      </div>
    `;
  }
}
