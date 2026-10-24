import { companiesData } from '../data/companies.js';
import { industriesData } from '../data/industries.js';
import { opportunitiesData } from '../data/opportunities.js';
import { newsData } from '../data/news.js';
import { eventsData } from '../data/events.js';
import { t, getLang, getLocalized } from '../i18n.js';

export function renderHomePage() {
  const lang = getLang();
  const isEs = lang === "es";

  return `
    <div class="animate-fade-in">
      
      <!-- HERO SECTION: CONVERSATIONAL SEARCH / SMART DIRECTORY ACCESS -->
      <section class="border-b border-outline-variant pb-margin-md mb-margin-md" id="discovery">
        <div class="max-w-4xl mx-auto text-center mb-8">
          <span class="font-mono-data text-mono-data text-secondary uppercase tracking-widest font-semibold mb-2 block">
            ${isEs ? "Motor Inteligente de Vinculación B2B" : "Intelligent B2B Matchmaking Engine"}
          </span>
          <h2 class="font-headline-lg text-headline-lg text-primary tracking-tight font-medium">
            ${isEs ? "¿Qué solución, proveedor o alianza estratégica busca tu empresa en Querétaro hoy?" : "What solution, supplier or strategic alliance is your company seeking in Querétaro today?"}
          </h2>
        </div>

        <!-- Typeform-Style Interactive Prompt Box -->
        <div class="max-w-4xl mx-auto bg-surface-container-lowest border border-outline-variant p-4 md:p-6 shadow-sm transition-all duration-200 hover:border-primary">
          <div class="flex flex-col md:flex-row items-stretch gap-4">
            <div class="flex-1 relative flex items-center border-b md:border-b-0 md:border-r border-outline-variant pb-3 md:pb-0 md:pr-4">
              <span class="material-symbols-outlined text-outline text-[24px] mr-3">search</span>
              <input class="w-full bg-transparent border-0 p-0 text-primary placeholder-on-surface-variant focus:ring-0 font-body-md text-body-md outline-none" id="conciergeInput" placeholder="${isEs ? "Ej. Mecanizado 5 ejes titanio, Despacho fiscal IMMEX, Comedores o Clínicas en parque..." : "E.g. 5-axis machining, IMMEX tax advisory, Park catering or 24/7 clinics..."}" type="text"/>
            </div>
            <div class="flex items-center gap-3">
              <button class="bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase px-6 py-3.5 transition-colors duration-150 flex items-center justify-center gap-2 w-full md:w-auto" id="triggerConciergeBtn" onclick="window.handleHomeSearch()">
                <span>${isEs ? "Consultar Concierge" : "Consult Concierge"}</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          <!-- Quick Access Filter Pills Covering All 3 Layers -->
          <div class="mt-4 pt-4 border-t border-outline-variant flex flex-wrap items-center gap-2">
            <span class="font-mono-data text-mono-data text-on-surface-variant mr-1">${isEs ? "Búsquedas Frecuentes:" : "Frequent Searches:"}</span>
            <button class="quick-pill bg-surface-container-low hover:bg-surface-container-high text-primary px-2.5 py-1 text-xs font-medium border border-outline-variant transition-colors flex items-center gap-1.5" onclick="window.setPromptQuery('Mecanizado 5 Ejes Titanio')">
              <span class="text-[9px] font-mono-data font-bold bg-secondary/15 text-secondary px-1 py-0.2">01·IND</span>
              <span>Mecanizado 5 Ejes Titanio</span>
            </button>
            <button class="quick-pill bg-surface-container-low hover:bg-surface-container-high text-primary px-2.5 py-1 text-xs font-medium border border-outline-variant transition-colors flex items-center gap-1.5" onclick="window.setPromptQuery('Despacho Fiscal & IMMEX Anexo 24')">
              <span class="text-[9px] font-mono-data font-bold bg-primary/10 text-primary px-1 py-0.2">02·SERV</span>
              <span>Despacho Fiscal & IMMEX</span>
            </button>
            <button class="quick-pill bg-surface-container-low hover:bg-surface-container-high text-primary px-2.5 py-1 text-xs font-medium border border-outline-variant transition-colors flex items-center gap-1.5" onclick="window.setPromptQuery('Comedores & Catering en PIQ')">
              <span class="text-[9px] font-mono-data font-bold bg-emerald-800/15 text-emerald-800 px-1 py-0.2">03·PARQUE</span>
              <span>Comedores & Catering en PIQ</span>
            </button>
            <button class="quick-pill bg-surface-container-low hover:bg-surface-container-high text-primary px-2.5 py-1 text-xs font-medium border border-outline-variant transition-colors flex items-center gap-1.5" onclick="window.setPromptQuery('Clínica Laboral Urgencias 24/7')">
              <span class="text-[9px] font-mono-data font-bold bg-emerald-800/15 text-emerald-800 px-1 py-0.2">03·PARQUE</span>
              <span>Clínica Urgencias 24/7</span>
            </button>
            <button class="quick-pill bg-surface-container-low hover:bg-surface-container-high text-primary px-2.5 py-1 text-xs font-medium border border-outline-variant transition-colors flex items-center gap-1.5" onclick="window.setPromptQuery('Staffing Técnico REPSE en Planta')">
              <span class="text-[9px] font-mono-data font-bold bg-primary/10 text-primary px-1 py-0.2">02·SERV</span>
              <span>Staffing Técnico & REPSE</span>
            </button>
            <button class="quick-pill bg-surface-container-low hover:bg-surface-container-high text-primary px-2.5 py-1 text-xs font-medium border border-outline-variant transition-colors flex items-center gap-1.5" onclick="window.setPromptQuery('Inyección de Plásticos ISO 9001')">
              <span class="text-[9px] font-mono-data font-bold bg-secondary/15 text-secondary px-1 py-0.2">01·IND</span>
              <span>Inyección Plástica ISO 9001</span>
            </button>
          </div>
        </div>
      </section>

      <!-- SECTION 2: LAS 3 CAPAS DEL ECOSISTEMA DE PARQUES INDUSTRIALES -->
      <section class="border-b border-outline-variant pb-margin-md mb-margin-md" id="ecosistema-3-capas">
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-outline-variant gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <span class="w-2.5 h-2.5 bg-secondary inline-block"></span>
              <span class="font-mono-data text-mono-data text-secondary uppercase tracking-widest font-bold">
                ${isEs ? "ARQUITECTURA DE VALOR · 3 CAPAS DEL ECOSISTEMA" : "VALUE ARCHITECTURE · 3 ECOSYSTEM LAYERS"}
              </span>
            </div>
            <h3 class="font-headline-lg text-2xl sm:text-3xl lg:text-headline-lg text-primary tracking-tight font-medium">
              ${isEs ? "Más allá de la manufactura: El ecosistema productivo completo en los parques de Querétaro" : "Beyond Manufacturing: The Complete Productive Ecosystem in Querétaro's Industrial Parks"}
            </h3>
            <p class="font-body-md text-body-md text-on-surface-variant max-w-3xl mt-2 leading-relaxed">
              ${isEs 
                ? "Una fábrica no opera en el vacío. Diseñamos la plataforma para representar a las tres fuerzas interconectadas que hacen viable la inversión industrial: la manufactura de precisión, los servicios corporativos de blindaje y las amenidades que sostienen el bienestar de la fuerza laboral."
                : "A manufacturing plant doesn't operate in a vacuum. We designed the platform to represent three interconnected forces powering industrial viability: precision manufacturing, specialized business services, and on-site amenities supporting employee welfare."}
            </p>
          </div>
          <div class="shrink-0 flex items-center gap-3">
            <a href="#/directory" class="border border-primary text-primary hover:bg-surface-container font-label-caps text-label-caps uppercase px-4 py-2.5 transition-colors duration-150 inline-flex items-center gap-2">
              <span>${isEs ? `Ver Directorio Global (${companiesData.length})` : `View Full Directory (${companiesData.length})`}</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
        </div>

        <!-- 3 Broadsheet Feature Pillars -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          
          <!-- LAYER 1 CARD: INDUSTRIAL & SUPPLY CHAIN -->
          <div class="border border-outline-variant bg-surface-container-lowest p-6 flex flex-col justify-between hover:border-secondary transition-all group">
            <div>
              <div class="flex items-center justify-between pb-3 mb-4 border-b border-outline-variant">
                <span class="bg-secondary text-on-secondary px-2 py-0.5 text-[10px] font-mono-data font-bold tracking-wider uppercase">
                  ${isEs ? "01 · INDUSTRIA & SUPPLY CHAIN" : "01 · INDUSTRIAL & SUPPLY"}
                </span>
                <span class="font-mono-data text-mono-data text-secondary font-bold">${companiesData.filter(c => c.layer === 'industrial').length} ${isEs ? "Empresas" : "Firms"}</span>
              </div>
              <h4 class="font-headline-md text-xl text-primary font-medium mb-2 group-hover:text-secondary transition-colors">
                ${isEs ? "Manufactura Avanzada, Herramentales & Líneas de Ensamble" : "Advanced Manufacturing, Tooling & Assembly Lines"}
              </h4>
              <p class="font-body-sm text-body-sm text-on-surface-variant mb-4 leading-relaxed">
                ${isEs 
                  ? "Celdas de maquinado 5 ejes, inyección de plásticos de ingeniería, cuartos limpios, robótica y manufactura estructural Tier 1/2 con trazabilidad de lote y planos técnicos."
                  : "5-axis CNC cells, engineered polymer injection, cleanrooms, robotics, and Tier 1/2 structural manufacturing with certified batch traceability and CAD specs."}
              </p>

              <!-- Capability Specs Matrix -->
              <div class="grid grid-cols-3 gap-2 py-3 px-3 bg-surface-container-low border border-outline-variant font-mono-data text-mono-data mb-4 text-center">
                <div>
                  <div class="font-bold text-primary text-xs">±0.003 mm</div>
                  <div class="text-[10px] text-on-surface-variant">Tolerancia</div>
                </div>
                <div>
                  <div class="font-bold text-secondary text-xs">0.0 PPM</div>
                  <div class="text-[10px] text-on-surface-variant">Rechazos</div>
                </div>
                <div>
                  <div class="font-bold text-primary text-xs">99.8%</div>
                  <div class="text-[10px] text-on-surface-variant">OTD</div>
                </div>
              </div>

              <!-- Key Highlights -->
              <ul class="space-y-1.5 font-mono-data text-mono-data text-xs text-on-surface-variant mb-6 border-l-2 border-secondary/40 pl-3">
                <li>• Certificaciones AS9100D, IATF 16949, ISO 9001</li>
                <li>• Simulación Wireframe CAD interactiva en perfil</li>
                <li>• Capacidad en Titanio, Inconel, PEEK y Aluminio</li>
              </ul>
            </div>

            <div class="pt-4 border-t border-outline-variant flex flex-col gap-2">
              <a href="#/directory?layer=industrial" class="bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase py-2.5 px-4 text-center transition-colors flex items-center justify-center gap-1.5">
                <span>${isEs ? `Explorar Capa Industrial (${companiesData.filter(c => c.layer === 'industrial').length})` : `Explore Industrial Layer (${companiesData.filter(c => c.layer === 'industrial').length})`}</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
              <button onclick="window.openConciergeDrawer('Requiero capacidad de manufactura, maquinado o proveeduría industrial')" class="text-on-surface-variant hover:text-primary font-mono-data text-mono-data text-xs py-1 text-center transition-colors">
                ${isEs ? "⚡ Solicitar RFQ de Maquinado" : "⚡ Request Machining RFQ"}
              </button>
            </div>
          </div>

          <!-- LAYER 2 CARD: BUSINESS SERVICES -->
          <div class="border border-outline-variant bg-surface-container-lowest p-6 flex flex-col justify-between hover:border-primary transition-all group">
            <div>
              <div class="flex items-center justify-between pb-3 mb-4 border-b border-outline-variant">
                <span class="bg-primary text-background px-2 py-0.5 text-[10px] font-mono-data font-bold tracking-wider uppercase">
                  ${isEs ? "02 · SERVICIOS EMPRESARIALES" : "02 · BUSINESS SERVICES"}
                </span>
                <span class="font-mono-data text-mono-data text-primary font-bold">${companiesData.filter(c => c.layer === 'services').length} ${isEs ? "Firmas" : "Firms"}</span>
              </div>
              <h4 class="font-headline-md text-xl text-primary font-medium mb-2 group-hover:text-secondary transition-colors">
                ${isEs ? "Comercio Exterior, Staffing Técnico & Blindaje Operativo" : "Customs & Trade, Technical Staffing & Risk Defense"}
              </h4>
              <p class="font-body-sm text-body-sm text-on-surface-variant mb-4 leading-relaxed">
                ${isEs 
                  ? "Firmas jurídicas de Anexo 24/30 IMMEX, reclutamiento masivo de cuadrillas técnicas en planta con registro REPSE, y seguridad de custodia satelital conectada a C4."
                  : "IMMEX Annex 24/30 customs legal defense, on-site certified technical staffing with REPSE compliance, and armed cargo security linked to state C4 monitors."}
              </p>

              <!-- Capability Specs Matrix -->
              <div class="grid grid-cols-3 gap-2 py-3 px-3 bg-surface-container-low border border-outline-variant font-mono-data text-mono-data mb-4 text-center">
                <div>
                  <div class="font-bold text-primary text-xs">&lt; 4 Horas</div>
                  <div class="text-[10px] text-on-surface-variant">SLA Respuesta</div>
                </div>
                <div>
                  <div class="font-bold text-primary text-xs">99.4%</div>
                  <div class="text-[10px] text-on-surface-variant">Tasa Éxito</div>
                </div>
                <div>
                  <div class="font-bold text-secondary text-xs">REPSE</div>
                  <div class="text-[10px] text-on-surface-variant">Vigente SAT</div>
                </div>
              </div>

              <!-- Key Highlights -->
              <ul class="space-y-1.5 font-mono-data text-mono-data text-xs text-on-surface-variant mb-6 border-l-2 border-primary/40 pl-3">
                <li>• Despachos IMMEX, Anexo 24 / 30 y VUCEM</li>
                <li>• Suministro de soldadores calificados ASME IX y CNC</li>
                <li>• Custodia de transporte con botón de pánico C4 y GPS</li>
              </ul>
            </div>

            <div class="pt-4 border-t border-outline-variant flex flex-col gap-2">
              <a href="#/directory?layer=services" class="border border-primary text-primary hover:bg-primary hover:text-background font-label-caps text-label-caps uppercase py-2.5 px-4 text-center transition-colors flex items-center justify-center gap-1.5">
                <span>${isEs ? `Explorar Servicios B2B (${companiesData.filter(c => c.layer === 'services').length})` : `Explore Business Services (${companiesData.filter(c => c.layer === 'services').length})`}</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
              <button onclick="window.openConciergeDrawer('Requiero asesoría fiscal IMMEX o staffing técnico en planta')" class="text-on-surface-variant hover:text-primary font-mono-data text-mono-data text-xs py-1 text-center transition-colors">
                ${isEs ? "⚡ Consultar Asesor de Comercio / REPSE" : "⚡ Consult Customs / REPSE Advisor"}
              </button>
            </div>
          </div>

          <!-- LAYER 3 CARD: PARK SERVICES & AMENITIES -->
          <div class="border border-outline-variant bg-surface-container-lowest p-6 flex flex-col justify-between hover:border-emerald-700 transition-all group">
            <div>
              <div class="flex items-center justify-between pb-3 mb-4 border-b border-outline-variant">
                <span class="bg-emerald-800 text-emerald-100 px-2 py-0.5 text-[10px] font-mono-data font-bold tracking-wider uppercase">
                  ${isEs ? "03 · PARQUE & AMENIDADES" : "03 · PARK AMENITIES"}
                </span>
                <span class="font-mono-data text-mono-data text-emerald-800 font-bold">${companiesData.filter(c => c.layer === 'amenities').length} ${isEs ? "Centros" : "Centers"}</span>
              </div>
              <h4 class="font-headline-md text-xl text-primary font-medium mb-2 group-hover:text-emerald-800 transition-colors">
                ${isEs ? "Alimentación Distintivo H, Clínicas 24/7 & Calidad de Vida" : "Certified Canteens, 24/7 Urgent Care & Executive Living"}
              </h4>
              <p class="font-body-sm text-body-sm text-on-surface-variant mb-4 leading-relaxed">
                ${isEs 
                  ? "Comedores industriales y salones ejecutivos, clínicas traumatológicas de urgencia con ambulancia en sitio, gimnasios ergonómicos y suites para directivos visitantes."
                  : "Industrial catering and executive dining with Distintivo H, on-site trauma clinics with ICU ambulances, ergonomics centers, and executive long-stay suites."}
              </p>

              <!-- Capability Specs Matrix -->
              <div class="grid grid-cols-3 gap-2 py-3 px-3 bg-surface-container-low border border-outline-variant font-mono-data text-mono-data mb-4 text-center">
                <div>
                  <div class="font-bold text-emerald-800 text-xs">24/7</div>
                  <div class="text-[10px] text-on-surface-variant">3 Turnos</div>
                </div>
                <div>
                  <div class="font-bold text-primary text-xs">&lt; 5 min</div>
                  <div class="text-[10px] text-on-surface-variant">Acceso Plantas</div>
                </div>
                <div>
                  <div class="font-bold text-emerald-800 text-xs">Dist. H</div>
                  <div class="text-[10px] text-on-surface-variant">COFEPRIS</div>
                </div>
              </div>

              <!-- Key Highlights -->
              <ul class="space-y-1.5 font-mono-data text-mono-data text-xs text-on-surface-variant mb-6 border-l-2 border-emerald-700/40 pl-3">
                <li>• Capacidad de 1,500+ raciones por turno en comedor</li>
                <li>• Convenio corporativo con gafete de parque industrial</li>
                <li>• Módulos de audiometría, rayos X y ergonomía en planta</li>
              </ul>
            </div>

            <div class="pt-4 border-t border-outline-variant flex flex-col gap-2">
              <a href="#/directory?layer=amenities" class="border border-emerald-800 text-emerald-900 hover:bg-emerald-800 hover:text-white font-label-caps text-label-caps uppercase py-2.5 px-4 text-center transition-colors flex items-center justify-center gap-1.5">
                <span>${isEs ? `Explorar Amenidades (${companiesData.filter(c => c.layer === 'amenities').length})` : `Explore Amenities (${companiesData.filter(c => c.layer === 'amenities').length})`}</span>
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
              <button onclick="window.openConciergeDrawer('Requiero servicio de comedor industrial, clínica laboral 24/7 o reserva ejecutiva')" class="text-on-surface-variant hover:text-primary font-mono-data text-mono-data text-xs py-1 text-center transition-colors">
                ${isEs ? "⚡ Coordinar Visita o Cotización de Comedor" : "⚡ Schedule Visit / Canteen Quote"}
              </button>
            </div>
          </div>

        </div>
      </section>

      <!-- SECTION 3: CINEMATIC HERO CAROUSEL (CRÓNICA & DESTACADOS B2B) -->
      <section class="border-b border-outline-variant pb-margin-md mb-margin-md" id="destacados-hero">
        <!-- Section Sub-Header & Controls Top Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-outline-variant gap-3">
          <div class="flex items-center gap-3">
            <span class="w-3 h-3 bg-secondary inline-block"></span>
            <span class="font-mono-data text-mono-data uppercase tracking-widest text-secondary font-bold">PORTADA & CRÓNICA DESTACADA · RED EMPRESARIAL QRO</span>
          </div>
          <div class="flex items-center gap-4">
            <!-- Slide Counter / Indicators -->
            <div class="font-mono-data text-mono-data text-on-surface-variant flex items-center gap-2">
              <span class="text-primary font-bold text-sm" id="heroCurrentSlideNum">01</span>
              <span class="text-outline-variant">/</span>
              <span>03</span>
            </div>
            <!-- Prev / Next Direction Buttons -->
            <div class="flex items-center border border-outline-variant bg-surface-container-lowest">
              <button aria-label="Slide anterior" class="p-2 text-primary hover:text-secondary hover:bg-surface-container transition-colors border-r border-outline-variant" id="heroPrevBtn" onclick="window.heroSlidePrev()">
                <span class="material-symbols-outlined text-[18px]">arrow_back</span>
              </button>
              <button aria-label="Slide siguiente" class="p-2 text-primary hover:text-secondary hover:bg-surface-container transition-colors" id="heroNextBtn" onclick="window.heroSlideNext()">
                <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Tabs Bar Selector -->
        <div class="grid grid-cols-1 md:grid-cols-3 border border-outline-variant bg-surface-container-low mb-0 divide-y md:divide-y-0 md:divide-x divide-outline-variant" id="heroTabsContainer">
          <button class="hero-tab-btn text-left p-3.5 sm:p-4 bg-surface-container-lowest border-b-2 border-secondary transition-all" data-slide-index="0" onclick="window.goToHeroSlide(0)">
            <div class="flex items-center justify-between text-mono-data font-mono-data text-xs mb-1">
              <span class="text-secondary font-bold">01. EMPRESA DEL DÍA</span>
              <span class="text-on-surface-variant font-mono-data text-[11px]">Capítulo El Marqués</span>
            </div>
            <p class="font-headline-sm text-sm sm:text-base text-primary font-medium truncate">Aerotech Composites Bajío: Mecanizado 5 Ejes</p>
          </button>
          <button class="hero-tab-btn text-left p-3.5 sm:p-4 hover:bg-surface-container-lowest text-on-surface-variant border-b-2 border-transparent transition-all" data-slide-index="1" onclick="window.goToHeroSlide(1)">
            <div class="flex items-center justify-between text-mono-data font-mono-data text-xs mb-1">
              <span class="text-secondary font-bold">02. NOTICIA CLAVE</span>
              <span class="text-on-surface-variant font-mono-data text-[11px]">Semiconductores QRO</span>
            </div>
            <p class="font-headline-sm text-sm sm:text-base text-primary font-medium truncate">Inversión récord: $420M USD Salas Limpias</p>
          </button>
          <button class="hero-tab-btn text-left p-3.5 sm:p-4 hover:bg-surface-container-lowest text-on-surface-variant border-b-2 border-transparent transition-all" data-slide-index="2" onclick="window.goToHeroSlide(2)">
            <div class="flex items-center justify-between text-mono-data font-mono-data text-xs mb-1">
              <span class="text-secondary font-bold">03. EVENTO CUMBRE</span>
              <span class="text-on-surface-variant font-mono-data text-[11px]">Club de Industriales</span>
            </div>
            <p class="font-headline-sm text-sm sm:text-base text-primary font-medium truncate">Cumbre Proveeduría & Nearshoring 2026</p>
          </button>
        </div>

        <!-- Time Progress Bar -->
        <div class="w-full bg-surface-container-high h-1 overflow-hidden border-x border-outline-variant">
          <div class="bg-secondary h-full hero-progress-active" id="heroProgressBar"></div>
        </div>

        <!-- Carousel Frame & Slides Canvas -->
        <div class="relative bg-surface-container-lowest border border-t-0 border-outline-variant overflow-hidden shadow-sm min-h-[480px] lg:min-h-[500px]">
          
          <!-- SLIDE 1: EMPRESA DEL DÍA (AEROTECH COMPOSITES BAJÍO) -->
          <article class="carousel-slide block opacity-100 transition-opacity duration-500" data-slide="0" id="heroSlide0">
            <div class="grid grid-cols-1 lg:grid-cols-12 min-h-[480px] lg:min-h-[500px]">
              <!-- Narrative & Metrics Panel (Left 7 Cols) -->
              <div class="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-outline-variant">
                <div>
                  <div class="flex flex-wrap items-center gap-2 mb-3">
                    <span class="bg-surface-container text-primary text-[11px] font-label-caps uppercase px-2 py-0.5 font-bold border-l-2 border-secondary">AS9100D Certificado</span>
                    <span class="bg-surface-container text-primary text-[11px] font-label-caps uppercase px-2 py-0.5 font-bold border-l-2 border-primary">Proveedor Tier 1</span>
                    <span class="bg-surface-container text-primary text-[11px] font-label-caps uppercase px-2 py-0.5 font-bold border-l-2 border-tertiary-container">Auditado QRO Clúster</span>
                  </div>
                  <span class="font-mono-data text-mono-data text-secondary uppercase font-bold tracking-widest block mb-1">EMPRESA DEL DÍA · CAPÍTULO EL MARQUÉS</span>
                  <h3 class="font-headline-lg text-3xl sm:text-4xl lg:text-headline-lg text-primary tracking-tight font-medium mb-2">
                    Aerotech Composites Bajío
                  </h3>
                  <p class="font-mono-data text-mono-data text-on-surface-variant mb-4">
                    Parque Industrial El Marqués, Nave B-14 · Fabricación y maquinado de ultraprecisión para aeroespacial, turbinas y defensa.
                  </p>
                  <blockquote class="border-l-2 border-secondary pl-5 my-4 italic font-headline-md text-xl sm:text-headline-md text-primary leading-snug">
                    «Cómo transformamos el corredor aeronáutico de Querétaro en el epicentro de suministro aeroespacial para Norteamérica.»
                    <footer class="font-body-sm text-body-sm text-on-surface-variant not-italic mt-2 font-medium">
                      — Ing. Sofía Balderas, Directora General
                    </footer>
                  </blockquote>
                </div>

                <div>
                  <!-- Key Metrics Strip -->
                  <div class="grid grid-cols-3 gap-3 pt-4 border-t border-outline-variant bg-surface-container-low p-3.5 mb-5">
                    <div>
                      <div class="font-mono-metric text-lg sm:text-mono-metric font-bold text-primary">14,000 m²</div>
                      <div class="font-mono-data text-mono-data text-on-surface-variant mt-0.5">Superficie Planta</div>
                    </div>
                    <div>
                      <div class="font-mono-metric text-lg sm:text-mono-metric font-bold text-secondary">99.8%</div>
                      <div class="font-mono-data text-mono-data text-on-surface-variant mt-0.5">OTD Cumplimiento</div>
                    </div>
                    <div>
                      <div class="font-mono-metric text-lg sm:text-mono-metric font-bold text-primary">12 Celdas</div>
                      <div class="font-mono-data text-mono-data text-on-surface-variant mt-0.5">Centros 5 Ejes CNC</div>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button class="bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase py-3 px-5 transition-colors duration-150 flex items-center justify-center gap-2" onclick="window.openTypeformModal('rfq', { companyId: 'aerotech-composites' })">
                      <span>Solicitar RFQ Directo</span>
                      <span class="material-symbols-outlined text-[16px]">send</span>
                    </button>
                    <a class="border border-primary text-primary hover:bg-surface-container font-label-caps text-label-caps uppercase py-3 px-4 text-center transition-colors duration-150" href="#/business/aerotech-composites">
                      Ver Mini-Sitio B2B
                    </a>
                    <a class="border border-outline-variant hover:border-primary text-primary hover:bg-surface-container font-label-caps text-label-caps uppercase py-3 px-4 text-center transition-colors duration-150 flex items-center justify-center gap-1.5" href="https://wa.me/524427904100" target="_blank">
                      <span class="material-symbols-outlined text-[16px] text-emerald-600">chat</span>
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Visual Photographic Panel (Right 5 Cols) -->
              <div class="lg:col-span-5 relative flex flex-col justify-end min-h-[280px] lg:min-h-full overflow-hidden bg-primary-container">
                <img alt="Planta industrial Aerotech Composites Bajío con centros de mecanizado 5 ejes de ultraprecisión" class="absolute inset-0 w-full h-full object-cover filter contrast-110 brightness-95" src="https://lh3.googleusercontent.com/aida/AEtjO1Vho0nKyZ2Ny3HAOUpS5osZocDvT1ep38GSujvoZvXXB4eJKQnJg29r8JzVBClR7zFxTeG-DF3Xmuhtkr9LfK4Vwea_pGv8Ad9Ncmnykpj-ZIt_mBchizgtZC4FSPb55hgUT7gMXhD91R5Ptyrt-p1BydBrs4PVU5xOB16mg-UFof0TxLwO8bTPvPEz0e9I8S4r1D8sLTYe8Q2BvSizhMlRuwYEDT97iNyBCskOc4K1qQ"/>
                <div class="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent"></div>
                <div class="relative z-10 p-6 sm:p-8 text-surface-bright">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="bg-secondary text-on-secondary text-[10px] font-mono-data font-bold uppercase px-2 py-0.5">Planta Verificada</span>
                    <span class="font-mono-data text-mono-data text-surface-variant">Hermle & DMG Mori 5 Ejes</span>
                  </div>
                  <h4 class="font-headline-sm text-lg text-surface-bright font-semibold mb-1">
                    Capacidad Inmediata: Aleaciones Titanio & Inconel
                  </h4>
                  <p class="font-mono-data text-xs text-outline-variant">
                    Tolerancias micronimétricas bajo certificación AS9100D Rev D en El Marqués.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <!-- SLIDE 2: NOTICIA CLAVE (SEMICONDUCTORES QRO) -->
          <article class="carousel-slide hidden opacity-0 transition-opacity duration-500" data-slide="1" id="heroSlide1">
            <div class="grid grid-cols-1 lg:grid-cols-12 min-h-[480px] lg:min-h-[500px]">
              <!-- Narrative & Metrics Panel (Left 7 Cols) -->
              <div class="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-outline-variant">
                <div>
                  <div class="flex flex-wrap items-center gap-2 mb-3">
                    <span class="bg-secondary text-on-secondary text-[11px] font-label-caps uppercase px-2.5 py-0.5 font-bold">Especial Economía & Semiconductores</span>
                    <span class="bg-surface-container text-primary text-[11px] font-label-caps uppercase px-2 py-0.5 font-bold border-l-2 border-primary">Primicia Exclusiva</span>
                    <span class="bg-surface-container text-primary text-[11px] font-label-caps uppercase px-2 py-0.5 font-bold border-l-2 border-tertiary-container">Corredor Querétaro-USA</span>
                  </div>
                  <span class="font-mono-data text-mono-data text-secondary uppercase font-bold tracking-widest block mb-1">NOTICIA CLAVE DE LA SEMANA · CRÓNICA FINANCIERA</span>
                  <h3 class="font-headline-lg text-3xl sm:text-4xl lg:text-headline-lg text-primary tracking-tight font-medium mb-3 leading-tight">
                    Inversión récord de semiconductores en Querétaro: $420M USD para centro de diseño y salas limpias
                  </h3>
                  <p class="font-body-md text-body-md text-on-surface-variant mb-4 leading-relaxed">
                    Un consorcio binacional de microelectrónica confirma la edificación del primer complejo de empaquetado avanzado y validación de microchips en el Parque Tecnológico Colón, sumando más de 1,200 ingenieros de alta especialidad.
                  </p>
                  <blockquote class="border-l-2 border-secondary pl-5 my-4 italic font-headline-md text-xl sm:text-headline-md text-primary leading-snug">
                    «Querétaro se convierte en la pieza angular del Corredor Chip del T-MEC para sustitución de insumos asiáticos.»
                    <footer class="font-body-sm text-body-sm text-on-surface-variant not-italic mt-2 font-medium">
                      — Consejo de Ciencia y Tecnología del Estado
                    </footer>
                  </blockquote>
                </div>

                <div>
                  <!-- Key Metrics Strip -->
                  <div class="grid grid-cols-3 gap-3 pt-4 border-t border-outline-variant bg-surface-container-low p-3.5 mb-5">
                    <div>
                      <div class="font-mono-metric text-lg sm:text-mono-metric font-bold text-secondary">$420M USD</div>
                      <div class="font-mono-data text-mono-data text-on-surface-variant mt-0.5">Inversión Capital</div>
                    </div>
                    <div>
                      <div class="font-mono-metric text-lg sm:text-mono-metric font-bold text-primary">6,500 m²</div>
                      <div class="font-mono-data text-mono-data text-on-surface-variant mt-0.5">Salas Limpias ISO 5</div>
                    </div>
                    <div>
                      <div class="font-mono-metric text-lg sm:text-mono-metric font-bold text-primary">1,200+</div>
                      <div class="font-mono-data text-mono-data text-on-surface-variant mt-0.5">Empleos Alta Tec.</div>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <a href="#/article/nearshoring-aerospace-expansion-2026" class="bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase py-3 px-6 transition-colors duration-150 flex items-center justify-center gap-2">
                      <span>Leer Crónica Completa</span>
                      <span class="material-symbols-outlined text-[16px]">menu_book</span>
                    </a>
                    <button class="border border-outline-variant hover:border-primary text-primary hover:bg-surface-container font-label-caps text-label-caps uppercase py-3 px-4 text-center transition-colors duration-150" onclick="window.showToast('Descargando Reporte Ejecutivo PDF...')">
                      Descargar Reporte Ejecutivo PDF
                    </button>
                  </div>
                </div>
              </div>

              <!-- Visual Photographic Panel (Right 5 Cols) -->
              <div class="lg:col-span-5 relative flex flex-col justify-end min-h-[280px] lg:min-h-full overflow-hidden bg-primary-container">
                <img alt="Ingenieros examinando obleas de silicio en sala limpia de semiconductores en Querétaro" class="absolute inset-0 w-full h-full object-cover filter contrast-110 brightness-95" src="https://lh3.googleusercontent.com/aida/AEtjO1VkmFyq2k52os8guipycML57uSAV7d-2k_NPW0ZyT4WbUCuPqNZC8ApZtMZCyh-hmtbVcnhrdcsBwZeX3RVKP_RpVmCoUBzsPndAfARDi0vkAlUiBRZ67oLbKS68bJU8BE6rnv7ozbR1-g3zfedZOF-9W28eFBwG4mr_p9o3W4l7kw1mYccjiOrLTPvOdUmGX_eGv-z0tTz1y7LeRHCsQ-mOHLTeq34PqP4AWgB_j3u"/>
                <div class="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent"></div>
                <div class="relative z-10 p-6 sm:p-8 text-surface-bright">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="bg-surface-container-lowest text-primary text-[10px] font-mono-data font-bold uppercase px-2 py-0.5">Laboratorio de Pruebas</span>
                    <span class="font-mono-data text-mono-data text-surface-variant">Obleas 300mm · Inspección Láser</span>
                  </div>
                  <h4 class="font-headline-sm text-lg text-surface-bright font-semibold mb-1">
                    Infraestructura de Grado de Semiconductores
                  </h4>
                  <p class="font-mono-data text-xs text-outline-variant">
                    Querétaro consolida su posición en el ecosistema CHIPS Act norteamericano.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <!-- SLIDE 3: EVENTO CUMBRE (CUMBRE ANUAL DE PROVEEDURÍA AEROESPACIAL) -->
          <article class="carousel-slide hidden opacity-0 transition-opacity duration-500" data-slide="2" id="heroSlide2">
            <div class="grid grid-cols-1 lg:grid-cols-12 min-h-[480px] lg:min-h-[500px]">
              <!-- Narrative & Metrics Panel (Left 7 Cols) -->
              <div class="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-outline-variant">
                <div>
                  <div class="flex flex-wrap items-center gap-2 mb-3">
                    <span class="bg-primary text-background text-[11px] font-label-caps uppercase px-2.5 py-0.5 font-bold">14-16 NOV 2026</span>
                    <span class="bg-surface-container text-primary text-[11px] font-label-caps uppercase px-2 py-0.5 font-bold border-l-2 border-secondary">Club de Industriales QRO</span>
                    <span class="bg-surface-container text-primary text-[11px] font-label-caps uppercase px-2 py-0.5 font-bold border-l-2 border-primary">B2B Matchmaking 1-a-1</span>
                  </div>
                  <span class="font-mono-data text-mono-data text-secondary uppercase font-bold tracking-widest block mb-1">EVENTO CUMBRE · CONVOCATORIA EXCLUSIVA</span>
                  <h3 class="font-headline-lg text-3xl sm:text-4xl lg:text-headline-lg text-primary tracking-tight font-medium mb-3 leading-tight">
                    Cumbre Anual de Proveeduría Aeroespacial y Nearshoring 2026
                  </h3>
                  <p class="font-body-md text-body-md text-on-surface-variant mb-4 leading-relaxed">
                    El punto de encuentro cumbre de 180 directores generales, compradores Tier 1 de Norteamérica y fondos de capital privado. Más de 650 citas de vinculación comercial programadas para proyectos de inversión.
                  </p>
                  <blockquote class="border-l-2 border-secondary pl-5 my-4 italic font-headline-md text-xl sm:text-headline-md text-primary leading-snug">
                    «Tres días para cerrar contratos de proveeduría estratégica y estructuración inmobiliaria industrial.»
                    <footer class="font-body-sm text-body-sm text-on-surface-variant not-italic mt-2 font-medium">
                      — Comité Organizador Cumbre Bajío 2026
                    </footer>
                  </blockquote>
                </div>

                <div>
                  <!-- Key Metrics Strip -->
                  <div class="grid grid-cols-3 gap-3 pt-4 border-t border-outline-variant bg-surface-container-low p-3.5 mb-5">
                    <div>
                      <div class="font-mono-metric text-lg sm:text-mono-metric font-bold text-primary">180+</div>
                      <div class="font-mono-data text-mono-data text-on-surface-variant mt-0.5">CEOs Confirmados</div>
                    </div>
                    <div>
                      <div class="font-mono-metric text-lg sm:text-mono-metric font-bold text-secondary">650+</div>
                      <div class="font-mono-data text-mono-data text-on-surface-variant mt-0.5">Citas B2B 1-a-1</div>
                    </div>
                    <div>
                      <div class="font-mono-metric text-lg sm:text-mono-metric font-bold text-primary">$85M USD</div>
                      <div class="font-mono-data text-mono-data text-on-surface-variant mt-0.5">Monto Proyectado</div>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <a href="#/event/bajio-aerospace-summit-2026" class="bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase py-3 px-6 transition-colors duration-150 flex items-center justify-center gap-2">
                      <span>Acreditar Asistencia</span>
                      <span class="material-symbols-outlined text-[16px]">how_to_reg</span>
                    </a>
                    <a class="border border-outline-variant hover:border-primary text-primary hover:bg-surface-container font-label-caps text-label-caps uppercase py-3 px-4 text-center transition-colors duration-150" href="#/events">
                      Ver Programa de Conferencias
                    </a>
                  </div>
                </div>
              </div>

              <!-- Visual Photographic Panel (Right 5 Cols) -->
              <div class="lg:col-span-5 relative flex flex-col justify-end min-h-[280px] lg:min-h-full overflow-hidden bg-primary-container">
                <img alt="Cumbre de líderes empresariales e industriales debatiendo en auditorio en Querétaro" class="absolute inset-0 w-full h-full object-cover filter contrast-110 brightness-95" src="https://lh3.googleusercontent.com/aida/AEtjO1U9WMnZ8APzH_w0UOTNYGWCxqChcOx3LDm7Ehqg4ZdwhZOosT1AiBN19FY0aFPcUQ0Q8_zyyI0-1AcKcWRSMKC1ATeEBQodx1G5CmSxCBCwp1uR7K6qskgjX9IiVaOfEwsHJiQvTAw_Y7ObP0j1dobHfeOhszDfnqECNU4tvpRIJw_g8Ohrmrzbg_Lw3lVn2YF_XmQr-THlGT5RWowLucSH2W0f33MQgwUmz6GZzw0XVg"/>
                <div class="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent"></div>
                <div class="relative z-10 p-6 sm:p-8 text-surface-bright">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="bg-secondary text-on-secondary text-[10px] font-mono-data font-bold uppercase px-2 py-0.5">Cupo Limitado</span>
                    <span class="font-mono-data text-mono-data text-surface-variant">Sede: Club de Industriales QRO</span>
                  </div>
                  <h4 class="font-headline-sm text-lg text-surface-bright font-semibold mb-1">
                    Networking de Alto Nivel con Tomadores de Decisión
                  </h4>
                  <p class="font-mono-data text-xs text-outline-variant">
                    Acceso preferencial para miembros activos de Red Empresarial QRO.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- SECTION 4: MERCADO NEED & OFFER (OPORTUNIDADES INDUSTRIALES) -->
      <section class="border-b border-outline-variant pb-margin-md mb-margin-md" id="mercado">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-2 border-b border-outline-variant">
          <div>
            <span class="font-mono-data text-mono-data text-secondary uppercase tracking-widest font-semibold block mb-1">
              Red de Intercambio Comercial Directo
            </span>
            <h3 class="font-headline-md text-headline-md text-primary tracking-tight font-medium">
              Mercado B2B: Demandas Urgentes & Ofertas Disponibles
            </h3>
          </div>
          <div class="flex items-center gap-3 mt-3 md:mt-0">
            <button class="bg-secondary text-on-secondary hover:bg-primary font-label-caps text-label-caps uppercase px-4 py-2 transition-colors duration-150 flex items-center gap-1.5" onclick="window.openTypeformModal('post-opportunity')">
              <span class="material-symbols-outlined text-[16px]">add_circle</span>
              <span>Publicar Requerimiento B2B</span>
            </button>
            <a class="text-primary hover:text-secondary font-mono-data text-mono-data underline" href="#/opportunities">
              Ver 48 Oportunidades →
            </a>
          </div>
        </div>

        <!-- 3 Monocle-Style Live Transaction Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <!-- Demand Card 1 -->
          <div class="border border-outline-variant bg-surface-container-lowest p-5 flex flex-col justify-between hover:border-secondary transition-all">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="bg-secondary text-on-secondary px-2 py-0.5 text-[10px] font-mono-data uppercase font-bold tracking-wider">
                  DEMANDA URGENTE
                </span>
                <span class="font-mono-data text-mono-data text-on-surface-variant">Hace 2 hrs</span>
              </div>
              <h4 class="font-headline-sm text-headline-sm text-primary mb-2">
                Tratamiento térmico por inducción automotriz
              </h4>
              <p class="font-body-sm text-body-sm text-on-surface-variant mb-4">
                Empresa automotriz Tier 1 busca taller certificado en Querétaro o San Juan del Río. Volumen mensual programado de 45,000 pzas bajo norma VDA 6.3.
              </p>
            </div>
            <div class="pt-4 border-t border-outline-variant flex items-center justify-between font-mono-data text-mono-data">
              <span class="text-secondary font-semibold">Parque Ind. Bernardo Quintana</span>
              <button class="hover:text-secondary font-bold flex items-center gap-1 text-primary" onclick="window.openTypeformModal('rfq', { companyId: 'aerotech-composites' })">
                Postularse <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          <!-- Offer Card 2 -->
          <div class="border border-outline-variant bg-surface-container-lowest p-5 flex flex-col justify-between hover:border-tertiary-container transition-all">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="bg-primary text-background px-2 py-0.5 text-[10px] font-mono-data uppercase font-bold tracking-wider">
                  OFERTA DISPONIBLE
                </span>
                <span class="font-mono-data text-mono-data text-on-surface-variant">Hoy 08:30 AM</span>
              </div>
              <h4 class="font-headline-sm text-headline-sm text-primary mb-2">
                Nave Industrial Clase A 3,800 m²
              </h4>
              <p class="font-body-sm text-body-sm text-on-surface-variant mb-4">
                Disponibilidad inmediata en Parque Innovación Querétaro. Techumbre KR-18 termoacústica, altura libre 12m, 4 andenes cross-docking y subestación 500 kVA.
              </p>
            </div>
            <div class="pt-4 border-t border-outline-variant flex items-center justify-between font-mono-data text-mono-data">
              <span class="text-primary font-semibold">Carretera a Chichimequillas</span>
              <a href="#/opportunities" class="hover:text-secondary font-bold flex items-center gap-1 text-primary">
                Ver Ficha Técnica <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </div>

          <!-- Demand Card 3 -->
          <div class="border border-outline-variant bg-surface-container-lowest p-5 flex flex-col justify-between hover:border-secondary transition-all">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="bg-secondary text-on-secondary px-2 py-0.5 text-[10px] font-mono-data uppercase font-bold tracking-wider">
                  DEMANDA URGENTE
                </span>
                <span class="font-mono-data text-mono-data text-on-surface-variant">Ayer 17:15</span>
              </div>
              <h4 class="font-headline-sm text-headline-sm text-primary mb-2">
                Empaque biodegradable grado alimenticio FDA
              </h4>
              <p class="font-body-sm text-body-sm text-on-surface-variant mb-4">
                Consorcio agroindustrial de San Juan del Río solicita proveeduría regional de cajas termoformadas de bagazo y películas compostables para exportación a EE. UU.
              </p>
            </div>
            <div class="pt-4 border-t border-outline-variant flex items-center justify-between font-mono-data text-mono-data">
              <span class="text-secondary font-semibold">San Juan del Río Cluster</span>
              <button class="hover:text-secondary font-bold flex items-center gap-1 text-primary" onclick="window.openTypeformModal('rfq', { companyId: 'mexifresh-organics' })">
                Enviar Catálogo <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 5: CURATED INDUSTRY PILLARS (EXPLORA POR ECOSISTEMA) -->
      <section class="border-b border-outline-variant pb-margin-md mb-margin-md" id="ecosistemas">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-2 border-b border-outline-variant">
          <div>
            <span class="font-mono-data text-mono-data text-secondary uppercase tracking-widest font-semibold block mb-1">
              Mapeo Territorial & Sectores Clave
            </span>
            <h3 class="font-headline-md text-headline-md text-primary tracking-tight font-medium">
              Pilares Industriales del Estado de Querétaro
            </h3>
          </div>
          <p class="font-mono-data text-mono-data text-on-surface-variant max-w-sm text-right hidden md:block">
            Directorio auditado bajo estándares de proveeduría nacional e internacional.
          </p>
        </div>

        <!-- 6 Modular Bento Tiles with Visual Framing -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          ${industriesData.map((ind) => `
            <div class="group border border-outline-variant bg-surface-container-lowest p-5 flex flex-col justify-between hover:bg-surface-container-low transition-colors duration-150">
              <div>
                <div class="overflow-hidden mb-4 border border-outline-variant">
                  <img class="w-full h-44 object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-300" src="${ind.image}" alt="${ind.name}"/>
                </div>
                <div class="flex items-center justify-between text-mono-data font-mono-data mb-1 text-secondary">
                  <span>${ind.clusterCode}</span>
                  <span>${ind.countLabel}</span>
                </div>
                <h4 class="font-headline-sm text-headline-sm text-primary mb-1">${getLocalized(ind, 'name')}</h4>
                <p class="font-body-sm text-body-sm text-on-surface-variant mb-4">
                  ${getLocalized(ind, 'tagline')}
                </p>
              </div>
              <a class="font-mono-data text-mono-data text-primary group-hover:text-secondary font-bold flex items-center justify-between pt-3 border-t border-outline-variant" href="#/industry/${ind.slug}">
                <span>Explorar Empresas Homologadas</span>
                <span>→</span>
              </a>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- SECTION 6: EDITORIAL INTELLIGENCE, PODCAST & EXCLUSIVE AGENDA -->
      <section class="border-b border-outline-variant pb-margin-md mb-margin-md">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg">
          <!-- 7 Columns: Editorial Deep-Dive & Podcast -->
          <div class="lg:col-span-7">
            <div class="flex items-center gap-2 mb-3">
              <span class="material-symbols-outlined text-secondary text-[20px]">mic</span>
              <span class="font-mono-data text-mono-data text-secondary uppercase font-bold tracking-widest">
                PODCAST & CRÓNICA EMPRESARIAL · EPISODIO 28
              </span>
            </div>
            <h3 class="font-headline-lg text-headline-lg text-primary tracking-tight font-medium mb-3">
              «La nueva ola de inversiones de Taiwán y Alemania: Por qué Querétaro lidera la conversión de semiconductores.»
            </h3>
            <p class="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
              Una conversación a profundidad con los directores de los fondos de inversión europea y representantes de la industria electrónica en el Bajío sobre los nuevos requerimientos de agua tratada, autosuficiencia energética y cadena de valor local.
            </p>

            <!-- Audio Player Module -->
            <div class="bg-surface-container-lowest border border-outline-variant p-4 flex items-center justify-between gap-4 mb-4">
              <button class="w-12 h-12 bg-primary text-background flex items-center justify-center hover:bg-secondary transition-colors shrink-0" onclick="window.togglePlayPodcast()">
                <span class="material-symbols-outlined text-[24px]" id="podcastPlayIcon">play_arrow</span>
              </button>
              <div class="flex-1">
                <div class="flex justify-between font-mono-data text-mono-data mb-1">
                  <span class="font-semibold text-primary">Voces de la Industria Bajío · 42:15 min</span>
                  <span class="text-on-surface-variant">Host: Carlos Mendoza</span>
                </div>
                <div class="w-full bg-surface-container-high h-1.5 overflow-hidden">
                  <div class="bg-secondary h-full" id="podcastProgressBar" style="width: 35%;"></div>
                </div>
              </div>
              <button class="text-on-surface-variant hover:text-primary transition-colors" onclick="window.showToast('Episodio guardado en tus marcadores.')">
                <span class="material-symbols-outlined text-[20px]">bookmark</span>
              </button>
            </div>
          </div>

          <!-- 5 Columns: Exclusive B2B Agenda -->
          <div class="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-outline-variant lg:pl-gutter-lg pt-6 lg:pt-0 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-4 pb-2 border-b border-outline-variant">
                <span class="font-mono-data text-mono-data uppercase tracking-widest text-primary font-bold">AGENDA B2B EXCLUSIVA</span>
                <a class="font-mono-data text-mono-data text-secondary hover:underline" href="#/events">Ver Calendario Completo</a>
              </div>

              <!-- Event 1 -->
              <div class="mb-5 pb-5 border-b border-outline-variant last:border-b-0">
                <div class="flex gap-4">
                  <div class="bg-surface-container-low border border-outline-variant px-3 py-2 text-center shrink-0 w-16">
                    <div class="font-headline-sm text-headline-sm font-bold text-primary">14</div>
                    <div class="font-mono-data text-mono-data uppercase text-secondary">NOV</div>
                  </div>
                  <div>
                    <span class="bg-surface-container px-2 py-0.5 text-[10px] font-mono-data text-primary font-semibold uppercase">Presencial · Registro Previo</span>
                    <h4 class="font-headline-sm text-headline-sm text-primary mt-1 mb-1 leading-snug">
                      <a href="#/event/bajio-aerospace-summit-2026" class="hover:text-secondary">Cumbre Anual de Proveeduría Aeroespacial 2026</a>
                    </h4>
                    <p class="font-body-sm text-body-sm text-on-surface-variant">
                      Club de Industriales de Querétaro · 180 tomadores de decisión confirmados.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Event 2 -->
              <div class="mb-2">
                <div class="flex gap-4">
                  <div class="bg-surface-container-low border border-outline-variant px-3 py-2 text-center shrink-0 w-16">
                    <div class="font-headline-sm text-headline-sm font-bold text-primary">28</div>
                    <div class="font-mono-data text-mono-data uppercase text-secondary">NOV</div>
                  </div>
                  <div>
                    <span class="bg-surface-container px-2 py-0.5 text-[10px] font-mono-data text-primary font-semibold uppercase">Mesa Redonda Privada</span>
                    <h4 class="font-headline-sm text-headline-sm text-primary mt-1 mb-1 leading-snug">
                      <a href="#/events" class="hover:text-secondary">Desayuno de Directores Generales Juriquilla</a>
                    </h4>
                    <p class="font-body-sm text-body-sm text-on-surface-variant">
                      Hacienda Juriquilla · Perspectivas Macro y Aranceles México-USA 2026.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-outline-variant">
              <button class="w-full border border-primary text-primary hover:bg-primary hover:text-background font-label-caps text-label-caps uppercase py-3 transition-colors duration-150" onclick="window.openTypeformModal('join-community')">
                Solicitar Acreditación de Prensa o Socio
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  `;
}

// Interactive Carousel Controllers
let currentHeroSlide = 0;
let heroAutoAdvanceTimer = null;

window.goToHeroSlide = function(index) {
  if (typeof document === "undefined" || !document.getElementById) return;
  currentHeroSlide = (index + 3) % 3;
  
  // Update slide visibilities
  for (let i = 0; i < 3; i++) {
    const slide = document.getElementById(`heroSlide${i}`);
    if (slide) {
      if (i === currentHeroSlide) {
        slide.classList.remove('hidden');
        setTimeout(() => {
          slide.classList.remove('opacity-0');
          slide.classList.add('opacity-100');
        }, 10);
      } else {
        slide.classList.remove('opacity-100');
        slide.classList.add('opacity-0');
        setTimeout(() => {
          if (i !== currentHeroSlide) slide.classList.add('hidden');
        }, 500);
      }
    }
  }

  // Update tabs
  const tabs = document.querySelectorAll(".hero-tab-btn");
  tabs.forEach((tab, idx) => {
    if (idx === currentHeroSlide) {
      tab.classList.remove('border-transparent', 'text-on-surface-variant');
      tab.classList.add('bg-surface-container-lowest', 'border-secondary', 'text-primary');
    } else {
      tab.classList.remove('bg-surface-container-lowest', 'border-secondary', 'text-primary');
      tab.classList.add('border-transparent', 'text-on-surface-variant');
    }
  });

  // Update slide counter
  const counter = document.getElementById("heroCurrentSlideNum");
  if (counter) counter.textContent = String(currentHeroSlide + 1).padStart(2, "0");

  // Reset Progress Bar
  const progressBar = document.getElementById("heroProgressBar");
  if (progressBar) {
    progressBar.classList.remove("hero-progress-active");
    void progressBar.offsetWidth;
    progressBar.classList.add("hero-progress-active");
  }

  startHeroAutoAdvance();
};

window.heroSlidePrev = function() {
  window.goToHeroSlide(currentHeroSlide - 1);
};

window.heroSlideNext = function() {
  window.goToHeroSlide(currentHeroSlide + 1);
};

function startHeroAutoAdvance() {
  if (heroAutoAdvanceTimer) clearInterval(heroAutoAdvanceTimer);
  heroAutoAdvanceTimer = setInterval(() => {
    window.goToHeroSlide(currentHeroSlide + 1);
  }, 7000);
}

// Start auto timer immediately
setTimeout(() => {
  startHeroAutoAdvance();
}, 500);

window.handleHomeSearch = function() {
  const input = document.getElementById("conciergeInput");
  const query = input ? input.value.trim() : "";
  window.openConciergeDrawer(query ? `Búsqueda iniciada desde el buscador: ${query}` : '');
};

window.setPromptQuery = function(query) {
  const input = document.getElementById("conciergeInput");
  if (input) input.value = query;
  window.openConciergeDrawer(`Requerimiento prioritario: ${query}`);
};

let isPodcastPlaying = false;
window.togglePlayPodcast = function() {
  isPodcastPlaying = !isPodcastPlaying;
  const icon = document.getElementById("podcastPlayIcon");
  if (icon) {
    icon.textContent = isPodcastPlaying ? "pause" : "play_arrow";
  }
  window.showToast(isPodcastPlaying ? "Reproduciendo: Voces de la Industria Bajío Ep. 28" : "Pausa");
};
