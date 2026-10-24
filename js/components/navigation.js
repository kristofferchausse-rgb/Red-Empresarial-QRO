import { t, getLang, setLanguage } from '../i18n.js';

export function renderHeader(currentRoute = "") {
  const lang = getLang();
  const isEs = lang === "es";

  return `
    <header class="bg-background text-primary w-full border-b border-outline-variant">
      <!-- Micro Financial & Meteorological Broadsheet Deck -->
      <div class="border-b border-outline-variant py-1.5 px-margin-md md:px-margin-lg max-w-7xl mx-auto flex flex-wrap items-center justify-between text-on-surface-variant font-mono-data text-mono-data">
        <div class="flex items-center space-x-4 overflow-x-auto whitespace-nowrap py-0.5">
          <span class="flex items-center gap-1 font-medium text-primary">
            <span class="material-symbols-outlined text-[14px]">location_on</span> Santiago de Querétaro, QRO
          </span>
          <span class="text-outline-variant">/</span>
          <span>USD/MXN <strong class="font-semibold text-primary">18.24</strong></span>
          <span class="text-outline-variant">/</span>
          <span class="flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">sunny</span> 24°C Despejado
          </span>
          <span class="text-outline-variant hidden sm:inline">/</span>
          <span class="hidden sm:inline">Edición No. 142 · Trimestre II</span>
        </div>
        <div class="flex items-center space-x-5 py-0.5 ml-auto">
          <div class="flex items-center gap-1">
            <button onclick="window.switchLanguage('es')" class="hover:text-secondary transition-colors uppercase tracking-widest font-semibold text-[11px] ${lang === 'es' ? 'text-secondary font-bold underline' : ''}">ES</button>
            <span class="text-outline-variant text-[10px]">/</span>
            <button onclick="window.switchLanguage('en')" class="hover:text-secondary transition-colors uppercase tracking-widest font-semibold text-[11px] ${lang === 'en' ? 'text-secondary font-bold underline' : ''}">EN</button>
          </div>
          <span class="text-outline-variant">|</span>
          <button onclick="window.openTypeformModal('join-community')" class="text-primary font-bold hover:text-secondary transition-colors flex items-center gap-1.5 text-[12px]">
            <span class="material-symbols-outlined text-[15px]">lock</span> ${isEs ? "Acceso Socios" : "Member Access"}
          </button>
        </div>
      </div>

      <!-- Main Editorial Title Anchor -->
      <div class="px-margin-md md:px-margin-lg max-w-7xl mx-auto pt-8 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant">
        <div>
          <span class="font-mono-data text-mono-data text-secondary uppercase tracking-widest font-semibold block mb-1">
            ${isEs ? "La Plataforma de Inteligencia & Comunidad B2B del Bajío" : "The Bajío B2B Intelligence & Community Platform"}
          </span>
          <h1 class="font-headline-lg text-headline-lg tracking-tight uppercase text-primary font-medium">
            <a href="#/" class="hover:text-secondary transition-colors">RED EMPRESARIAL QRO</a>
          </h1>
          <p class="font-headline-sm text-headline-sm italic text-on-surface-variant mt-1 font-normal">
            ${isEs ? "Crónica Empresarial, Directorio Industrial y Red de Negocios del Estado" : "Executive Chronicle, Industrial Directory & Regional Business Network"}
          </p>
        </div>

        <!-- Live Index Widget & Quick Search -->
        <div class="flex items-center gap-4 pb-1">
          <div class="hidden lg:flex flex-col text-right pr-4 border-r border-outline-variant font-mono-data text-mono-data">
            <span class="text-on-surface-variant">${isEs ? "Índice Industrial QRO" : "QRO Industrial Index"}</span>
            <span class="text-secondary font-bold text-sm">+2.48% (Nearshoring Index)</span>
          </div>
          <div class="flex items-center gap-2">
            <button aria-label="Buscar" class="p-2 border border-outline-variant hover:border-primary hover:text-secondary transition-colors" onclick="window.location.hash = '#/directory'">
              <span class="material-symbols-outlined text-[20px]">search</span>
            </button>
            <button aria-label="Filtros" class="p-2 border border-outline-variant hover:border-primary hover:text-secondary transition-colors" onclick="window.openTypeformModal('matchmaker')">
              <span class="material-symbols-outlined text-[20px]">tune</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Broadsheet Navigation Ribbons (100% Spanish) -->
      <nav class="hidden md:flex px-margin-md md:px-margin-lg max-w-7xl mx-auto items-center justify-between py-2 text-label-caps font-label-caps overflow-x-auto">
        <div class="flex items-center space-x-8">
          <a class="${currentRoute === 'home' || currentRoute === '' ? 'border-b-2 border-secondary text-primary font-bold' : 'text-on-surface-variant hover:text-secondary'} uppercase tracking-wider pb-1 transition-colors" href="#/">
            ${isEs ? "Portada" : "Journal"}
          </a>
          <a class="${currentRoute === 'directory' ? 'border-b-2 border-secondary text-primary font-bold' : 'text-on-surface-variant hover:text-secondary'} uppercase tracking-wider pb-1 transition-colors" href="#/directory">
            ${isEs ? "Directorio & Ecosistema" : "Directory & Ecosystem"}
          </a>
          <a class="${currentRoute === 'opportunities' ? 'border-b-2 border-secondary text-primary font-bold' : 'text-on-surface-variant hover:text-secondary'} uppercase tracking-wider pb-1 transition-colors" href="#/opportunities">
            ${isEs ? "Mercado B2B" : "Need & Offer"}
          </a>
          <a class="${currentRoute === 'news' || currentRoute.startsWith('article') ? 'border-b-2 border-secondary text-primary font-bold' : 'text-on-surface-variant hover:text-secondary'} uppercase tracking-wider pb-1 transition-colors" href="#/news">
            ${isEs ? "Crónica & Noticias" : "Editorial & News"}
          </a>
          <a class="${currentRoute === 'events' || currentRoute.startsWith('event') ? 'border-b-2 border-secondary text-primary font-bold' : 'text-on-surface-variant hover:text-secondary'} uppercase tracking-wider pb-1 transition-colors" href="#/events">
            ${isEs ? "Cumbres & Eventos" : "Events"}
          </a>
          <a class="${currentRoute === 'learn' ? 'border-b-2 border-secondary text-primary font-bold' : 'text-on-surface-variant hover:text-secondary'} uppercase tracking-wider pb-1 transition-colors" href="#/learn">
            ${isEs ? "Academia & Cursos" : "Learn"}
          </a>
          <button onclick="window.openTypeformModal('matchmaker')" class="text-secondary uppercase tracking-wider pb-1 hover:underline flex items-center gap-1 font-bold">
            <span class="material-symbols-outlined text-[14px]">bolt</span> ${isEs ? "Concierge B2B" : "Concierge"}
          </button>
        </div>
        <div class="font-mono-data text-mono-data text-on-surface-variant">
          ${isEs ? "13 Entidades en 3 Capas del Ecosistema" : "13 Verified Entities in 3 Business Layers"}
        </div>
      </nav>
    </header>
  `;
}

export function renderTickerRibbon() {
  return `
    <section class="bg-primary-container text-surface-bright py-2 border-y border-outline overflow-hidden select-none">
      <div class="max-w-7xl mx-auto px-4 flex items-center">
        <div class="bg-secondary text-on-secondary px-2 py-0.5 text-[10px] font-mono-data uppercase font-bold tracking-wider shrink-0 mr-4 z-10">
          MERCADO VIVO
        </div>
        <div class="overflow-hidden w-full">
          <div class="animate-marquee font-mono-data text-mono-data text-surface-variant flex items-center whitespace-nowrap gap-8">
            <span class="flex items-center gap-2">
              <span class="bg-secondary text-on-secondary px-1 py-0.2 text-[9px] font-bold">01·INDUSTRIA</span> Automotriz Tier 1 busca tratamiento térmico por inducción (45,000 pzas/mes)
            </span>
            <span class="text-secondary">◆</span>
            <span class="flex items-center gap-2">
              <span class="bg-primary text-background px-1 py-0.2 text-[9px] font-bold">02·SERVICIOS</span> LexBajío Trade habilita auditoría de prevención fiscal SAT para Anexo 24 IMMEX
            </span>
            <span class="text-secondary">◆</span>
            <span class="flex items-center gap-2">
              <span class="bg-emerald-800 text-emerald-100 px-1 py-0.2 text-[9px] font-bold">03·AMENIDAD</span> Bistro Central PIQ abre reservaciones en salas privadas ejecutivas y catering
            </span>
            <span class="text-secondary">◆</span>
            <span class="flex items-center gap-2">
              <span class="bg-secondary text-on-secondary px-1 py-0.2 text-[9px] font-bold">01·INDUSTRIA</span> Capacidad disponible: Mecanizado 5 Ejes CNC en Titanio Ti-6Al-4V (El Marqués)
            </span>
            <span class="text-secondary">◆</span>
            <span class="flex items-center gap-2">
              <span class="bg-primary text-background px-1 py-0.2 text-[9px] font-bold">02·SERVICIOS</span> Vesta Talent lanza cuadrilla de 80 operadores y técnicos con certificación REPSE
            </span>
            <span class="text-secondary">◆</span>
            <span class="flex items-center gap-2">
              <span class="bg-emerald-800 text-emerald-100 px-1 py-0.2 text-[9px] font-bold">03·AMENIDAD</span> MedPark Clínica 24/7 en Aerotech activa protocolo de urgencias para 2º y 3º turno
            </span>
            <span class="text-secondary">◆</span>
            <!-- Duplicate for continuous scroll -->
            <span class="flex items-center gap-2">
              <span class="bg-secondary text-on-secondary px-1 py-0.2 text-[9px] font-bold">01·INDUSTRIA</span> Automotriz Tier 1 busca tratamiento térmico por inducción (45,000 pzas/mes)
            </span>
            <span class="text-secondary">◆</span>
            <span class="flex items-center gap-2">
              <span class="bg-primary text-background px-1 py-0.2 text-[9px] font-bold">02·SERVICIOS</span> LexBajío Trade habilita auditoría de prevención fiscal SAT para Anexo 24 IMMEX
            </span>
            <span class="text-secondary">◆</span>
            <span class="flex items-center gap-2">
              <span class="bg-emerald-800 text-emerald-100 px-1 py-0.2 text-[9px] font-bold">03·AMENIDAD</span> Bistro Central PIQ abre reservaciones en salas privadas ejecutivas y catering
            </span>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderMobileBottomNav(currentRoute = "") {
  return `
    <nav class="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-margin py-space-xs border-t border-outline-variant bg-surface-container-lowest shadow-lg">
      <a class="flex flex-col items-center justify-center ${currentRoute === 'directory' ? 'text-secondary font-bold' : 'text-on-surface-variant'} font-label-caps text-label-caps" href="#/directory">
        <span class="material-symbols-outlined text-[20px]">menu_book</span>
        <span class="text-[10px] mt-0.5">Directorio</span>
      </a>
      <a class="flex flex-col items-center justify-center ${currentRoute === 'opportunities' ? 'text-secondary font-bold' : 'text-on-surface-variant'} font-label-caps text-label-caps" href="#/opportunities">
        <span class="material-symbols-outlined text-[20px]">swap_horiz</span>
        <span class="text-[10px] mt-0.5">Mercado</span>
      </a>
      <a class="flex flex-col items-center justify-center ${currentRoute === 'home' || currentRoute === '' ? 'text-secondary font-bold' : 'text-on-surface-variant'} font-label-caps text-label-caps" href="#/">
        <span class="material-symbols-outlined text-[20px]">newspaper</span>
        <span class="text-[10px] mt-0.5">Portada</span>
      </a>
      <button onclick="window.openTypeformModal('matchmaker')" class="flex flex-col items-center justify-center text-on-surface-variant font-label-caps text-label-caps">
        <span class="material-symbols-outlined text-[20px]">support_agent</span>
        <span class="text-[10px] mt-0.5">Concierge</span>
      </button>
      <button onclick="window.openTypeformModal('join-community')" class="flex flex-col items-center justify-center text-on-surface-variant font-label-caps text-label-caps">
        <span class="material-symbols-outlined text-[20px]">account_circle</span>
        <span class="text-[10px] mt-0.5">Socios</span>
      </button>
    </nav>
  `;
}

export function renderFooter() {
  return `
    <footer class="bg-surface-container-low text-primary border-t border-outline-variant mt-auto w-full">
      <div class="w-full px-margin-md md:px-margin-lg py-margin-md max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-gutter-lg pb-10 border-b border-outline-variant">
          <!-- Brand Narrative Column -->
          <div class="md:col-span-5">
            <div class="font-headline-md text-headline-md uppercase tracking-tight text-primary font-medium mb-2">
              RED EMPRESARIAL QRO
            </div>
            <p class="font-body-sm text-body-sm text-on-surface-variant max-w-md leading-relaxed mb-6">
              La publicación y red privada de negocios que articula el ecosistema manufacturero, logístico y tecnológico más dinámico de México. Santiago de Querétaro, República Mexicana.
            </p>
            <div class="flex items-center space-x-3 text-mono-data font-mono-data text-secondary">
              <span>ISSN 2954-4823</span>
              <span>·</span>
              <span>Registro de Marca QRO-B2B</span>
            </div>
          </div>

          <!-- Links Columns: 4-Column Broadsheet Breakdown -->
          <div class="md:col-span-7 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h5 class="font-label-caps text-label-caps uppercase tracking-wider text-primary mb-3 font-bold">
                Ecosistema
              </h5>
              <ul class="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                <li><a class="hover:text-secondary transition-colors" href="#/directory?layer=industrial">01 · Industria & Supply</a></li>
                <li><a class="hover:text-secondary transition-colors" href="#/directory?layer=services">02 · Servicios B2B</a></li>
                <li><a class="hover:text-secondary transition-colors" href="#/directory?layer=amenities">03 · Parque & Amenidades</a></li>
                <li><a class="hover:text-secondary font-semibold transition-colors" href="#/directory">Ver Todo (13 Empresas)</a></li>
              </ul>
            </div>
            <div>
              <h5 class="font-label-caps text-label-caps uppercase tracking-wider text-primary mb-3 font-bold">
                Publicación
              </h5>
              <ul class="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                <li><a class="hover:text-secondary transition-colors" href="#/">Portada & Journal</a></li>
                <li><a class="hover:text-secondary transition-colors" href="#/opportunities">Mercado B2B & RFQ</a></li>
                <li><a class="hover:text-secondary transition-colors" href="#/news">Crónicas & Análisis</a></li>
                <li><a class="hover:text-secondary transition-colors" href="#/learn">Academia y Cursos</a></li>
              </ul>
            </div>
            <div>
              <h5 class="font-label-caps text-label-caps uppercase tracking-wider text-primary mb-3 font-bold">
                Comunidad
              </h5>
              <ul class="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                <li><a class="hover:text-secondary font-medium transition-colors" href="javascript:void(0)" onclick="window.openTypeformModal('matchmaker')">⚡ AI Concierge</a></li>
                <li><a class="hover:text-secondary transition-colors" href="javascript:void(0)" onclick="window.openTypeformModal('join-community')">Membresía Red</a></li>
                <li><a class="hover:text-secondary transition-colors" href="#/events">Cumbres & Eventos</a></li>
                <li><a class="hover:text-secondary transition-colors" href="javascript:void(0)" onclick="window.openConciergeDrawer('Buscar alianza estratégica regional')">Mesa de Enlace</a></li>
              </ul>
            </div>
            <div>
              <h5 class="font-label-caps text-label-caps uppercase tracking-wider text-primary mb-3 font-bold">
                Corredores
              </h5>
              <ul class="space-y-2 font-mono-data text-mono-data text-on-surface-variant">
                <li><a href="#/directory?zone=El Marqués" class="hover:text-secondary">El Marqués</a></li>
                <li><a href="#/directory?zone=Bernardo Quintana" class="hover:text-secondary">Pq. Bernardo Quintana</a></li>
                <li><a href="#/directory?zone=Aeropuerto / Colón" class="hover:text-secondary">Aeropuerto / Colón</a></li>
                <li><a href="#/directory?zone=PIQ Santa Rosa" class="hover:text-secondary">PIQ Santa Rosa</a></li>
              </ul>
          </div>
        </div>

        <!-- Broadsheet Copyright Deck -->
        <div class="pt-6 flex flex-col md:flex-row items-center justify-between text-on-surface-variant font-body-sm text-body-sm gap-4">
          <div>
            © 2026 RED EMPRESARIAL QRO. Todos los derechos reservados. Red B2B Regional & Inteligencia de Negocios.
          </div>
          <div class="flex items-center space-x-6 font-mono-data text-mono-data">
            <span>Diseño Cantera & Basalt Editorial</span>
            <span>·</span>
            <span>Actualización Diaria 06:00 CST</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}

window.switchLanguage = function(lang) {
  setLanguage(lang);
};
