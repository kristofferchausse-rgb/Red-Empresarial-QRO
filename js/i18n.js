// Internationalization (i18n) Engine for Red Empresarial QRO
// Default Primary Language: Spanish ('es')

let currentLang = localStorage.getItem("pulso_lang") || "es";

export const translations = {
  es: {
    // Navigation & Header
    nav_discovery: "Descubrimiento",
    nav_directory: "Directorio",
    nav_opportunities: "Oportunidades y RFQs",
    nav_editorial: "Editorial",
    nav_events: "Eventos",
    nav_learn: "Aprender",
    btn_find_supplier: "Buscar Proveedor",
    btn_post_need: "Publicar Necesidad / RFQ",
    all_clusters: "Todos los Clústeres",
    claim_mini_site: "Reclamar Mini-Sitio Empresarial",
    ask_concierge: "¿Buscas un proveedor en Querétaro? Pregunta al Concierge",

    // Homepage
    business_of_day_badge: "Empresa del Día • Querétaro",
    currently_seeking: "Buscando actualmente en Querétaro:",
    explore_mini_site: "Explorar Mini-Sitio",
    whatsapp_director: "WhatsApp con Director",
    search_heading: "¿Qué necesita tu empresa en Querétaro?",
    search_sub: "Describe tu requerimiento en lenguaje natural o inicia el asistente de IA.",
    search_placeholder: "Ej: 'Necesito maquinado CNC AS9100 en El Marqués'...",
    search_btn: "Buscar Proveedores",
    search_try: "Prueba buscando:",
    businesses_you_should_know: "Empresas que Debes Conocer",
    businesses_you_should_know_sub: "Proveedores destacados de manufactura, logística y tecnología verificados en Querétaro.",
    view_all_directory: "Ver Todo el Directorio",
    explore_by_sector: "Explorar Querétaro por Sector",
    explore_by_sector_sub: "Conoce los clústeres especializados que impulsan la cadena de suministro global del estado.",
    all_clusters_btn: "Ver los 10 Clústeres",
    active_opportunities_title: "Necesidades Actuales, RFQs y Capacidad Abierta",
    active_opportunities_sub: "Licitaciones directas, requerimientos de proveedores y horas de maquinaria disponibles en Querétaro.",
    all_opportunities_btn: "Ver Todas las Oportunidades",
    editorial_insights_title: "Noticias y Análisis Industrial de Querétaro",
    editorial_insights_sub: "Periodismo de negocios sobre nearshoring aeroespacial, robótica y expansión económica.",
    read_all_stories: "Ver Todas las Historias",
    upcoming_summits_title: "Próximos Encuentros y Visitas Industriales",
    upcoming_summits_sub: "Donde conectan los directores de planta y líderes de compras de Querétaro.",
    all_events_btn: "Ver Todos los Eventos",
    learn_masterclasses_title: "Aprender: Masterclasses Industriales",
    learn_masterclasses_sub: "Cumplimiento normativo, visión artificial y estrategia T-MEC impartida por líderes de planta locales.",
    explore_courses_btn: "Explorar Cursos",
    people_to_know_title: "Líderes que Debes Conocer en Querétaro",
    people_to_know_sub: "Conversaciones con los fundadores, directores de planta e innovadores que transforman el Bajío.",
    join_community_title: "Lleva tu Empresa de Querétaro al Siguiente Nivel",
    join_community_sub: "Obtén un mini-sitio modular profesional, publica RFQs, recibe solicitudes directas de compradores OEM y participa en eventos exclusivos de networking.",
    apply_mini_site_btn: "Solicitar Mini-Sitio para Miembros",
    try_ai_concierge_btn: "Probar Asistente de IA",

    // Business Layers (3 Capas del Ecosistema)
    layer_all: "Todo el Ecosistema",
    layer_all_desc: "El ecosistema integral operando dentro y alrededor de los parques industriales de Querétaro.",
    layer_industrial: "Industria & Cadena de Suministro",
    layer_industrial_desc: "Manufactura de precisión, herramentales, maquinado 5 ejes, robótica, inyección y naves.",
    layer_services: "Servicios Empresariales",
    layer_services_desc: "Despachos fiscales y aduanales IMMEX, atracción de talento de planta, custodia satelital y litigio.",
    layer_amenities: "Servicios de Parque & Amenidades",
    layer_amenities_desc: "Comedores industriales Distintivo H, clínicas laborales 24/7, gimnasios con convenio y hospedaje ejecutivo.",
    layer_filter_label: "Capa del Ecosistema",
    view_layer_ecosystem: "Explorar las 3 Capas del Ecosistema",
    badge_industrial: "INDUSTRIA & MANUFACTURA",
    badge_services: "SERVICIOS EMPRESARIALES",
    badge_amenities: "SERVICIO DE PARQUE & AMENIDAD",

    // Directory
    dir_title: "Directorio B2B Querétaro",
    dir_sub: "Explora proveedores verificados de manufactura, integradores de automatización, logística fiscalizada y servicios corporativos en los 18 parques industriales del estado.",
    filter_search_label: "Buscar Capacidad / Nombre",
    filter_search_placeholder: "Ej: 5 Ejes, Autoclave, C-TPAT...",
    filter_cluster_label: "Clúster Industrial",
    filter_zone_label: "Zona / Parque Industrial",
    filter_cert_label: "Estándar de Certificación",
    showing_companies: "Mostrando",
    verified_in_qro: "empresas verificadas en Querétaro",
    clear_filters: "Limpiar Filtros",
    all_zones: "Todas las Zonas",
    any_cert: "Cualquier Certificación",
    no_matches_title: "Ninguna empresa coincide con los filtros seleccionados",
    no_matches_sub: "Intenta limpiar filtros específicos o inicia el asistente inteligente de vinculación B2B.",

    // Business Profile
    verified_member: "Miembro Verificado",
    workforce: "Plantilla:",
    established: "Fundada en:",
    website: "Sitio Web:",
    download_spec_sheet: "Descargar Ficha Técnica (PDF)",
    strategic_positioning: "Posicionamiento Estratégico y Problema que Resuelve",
    our_positioning: "Nuestro Posicionamiento en 1 Línea",
    problem_we_solve: "Problema que Resolvemos para Clientes",
    ideal_customer: "Perfil de Cliente Ideal (ICP)",
    tech_differentiator: "Diferenciador Técnico Clave",
    plant_facilities: "Instalaciones de Planta y Parque de Maquinaria",
    facilities_sub: "Activos de manufactura instalados y laboratorios de prueba operando en Querétaro.",
    core_services: "Capacidades y Servicios Principales",
    case_studies_title: "Casos de Éxito Probados y Resultados Cuantificados",
    key_impact: "Impacto Clave",
    intra_platform_exchange: "Intercambio en la Cadena de Suministro",
    what_buying_now: "Lo que esta empresa está Comprando / Buscando Actualmente:",
    respond_offer: "Responder con Propuesta de Proveedor",
    key_leadership: "Liderazgo y Contacto Directo",
    official_certs: "Certificaciones Oficiales",
    other_suppliers_in_cluster: "Otros Proveedores Verificados en Querétaro de",
    request_rfq_btn: "Solicitar Cotización / RFQ",

    // Opportunities
    opp_title: "Oportunidades de Negocio y RFQs",
    opp_sub: "Licitaciones de compras directas, capacidad disponible de maquinado CNC de 5 ejes, consorcios estratégicos y solicitudes de suministro en Querétaro.",
    post_opp_btn: "Publicar Necesidad o RFQ",
    all_opps: "Todas las Oportunidades",
    opp_rfq: "📋 Solicitud de Cotización (RFQs)",
    opp_need: "🔍 Se Busca / Compras",
    opp_offer: "⚡ Capacidad Disponible y Ofertas",
    opp_partner: "🤝 Alianzas y Consorcios",
    key_specs: "Especificaciones Clave:",
    budget_value: "Presupuesto / Valor:",
    submit_bid: "Postular / Responder",

    // Events
    events_title: "Eventos y Cumbres B2B en Querétaro",
    events_sub: "“El networking no debe terminar cuando el evento termina.” Regístrate a cumbres ejecutivas, visitas a plantas y accede al archivo de colaboración posterior al evento.",
    event_rsvp_btn: "Reservar Pase de Delegado (Gratis para Miembros)",
    connect_attendees_btn: "Conectar con Asistentes al Evento",
    post_event_archive: "Archivo de Networking Posterior al Evento",
    key_takeaways: "Resultados y Conclusiones Ejecutivas",
    event_photos: "Fotografía del Evento:",
    download_report: "Descargar Reporte Completo de Proveeduría",
    official_agenda: "Agenda Oficial del Evento",
    speakers_title: "Ponentes y Moderadores Destacados",
    participating_companies: "Empresas Participantes",
    venue_location: "Sede y Ubicación",

    // Learn
    learn_title: "Aprender: Masterclasses Industriales del Bajío",
    learn_sub: "Cursos prácticos, talleres técnicos y seminarios de cumplimiento impartidos por directores de planta, ingenieros aeroespaciales y abogados de comercio exterior en Querétaro.",
    enroll_btn: "Inscribirse a la Generación",
    instructor_label: "Instructor:",
    syllabus_label: "Temas Destacados del Programa:",

    // Footer
    footer_desc: "La plataforma editorial de descubrimiento de negocios y ecosistema de oportunidades para la economía industrial y aeroespacial de Querétaro.",
    key_ecosystems: "Ecosistemas Clave",
    platform_tools: "Plataforma y Herramientas",
    qro_hub: "Corredor Querétaro",
    qro_hub_desc: "Cobertura en Parque Aeroespacial, PIQ Santa Rosa, El Marqués, Balvanera y el Corredor de Innovación Juriquilla.",
    copyright: "© 2026 Red Empresarial QRO. Contenido demo para prototipo."
  },
  en: {
    // Navigation & Header
    nav_discovery: "Discovery",
    nav_directory: "Directory",
    nav_opportunities: "Opportunities & RFQs",
    nav_editorial: "Editorial",
    nav_events: "Events",
    nav_learn: "Learn",
    btn_find_supplier: "Find Supplier",
    btn_post_need: "Post Need / RFQ",
    all_clusters: "All Clusters",
    claim_mini_site: "Claim Business Mini-Site",
    ask_concierge: "Need a Querétaro supplier? Ask Concierge",

    // Homepage
    business_of_day_badge: "Business of the Day • Querétaro",
    currently_seeking: "Currently Seeking in Querétaro:",
    explore_mini_site: "Explore Mini-Site",
    whatsapp_director: "WhatsApp Director",
    search_heading: "What does your business need in Querétaro?",
    search_sub: "Describe your requirement in natural language or launch the AI wizard.",
    search_placeholder: "e.g., 'I need an AS9100 CNC machining provider in El Marqués'...",
    search_btn: "Find Suppliers",
    search_try: "Try searching:",
    businesses_you_should_know: "Businesses You Should Know",
    businesses_you_should_know_sub: "Outstanding manufacturing, logistics, and technology partners verified in Querétaro.",
    view_all_directory: "View All Directory",
    explore_by_sector: "Explore Querétaro by Sector",
    explore_by_sector_sub: "Deep dive into the specialized clusters powering the state's global supply chain.",
    all_clusters_btn: "All 10 Clusters",
    active_opportunities_title: "Current Needs, RFQs & Open Capacity",
    active_opportunities_sub: "Real-time procurement tenders, supplier requests, and surplus machinery hours in Querétaro.",
    all_opportunities_btn: "All Opportunities",
    editorial_insights_title: "Querétaro Business & Industrial Insights",
    editorial_insights_sub: "In-depth reporting on aerospace nearshoring, smart robotics, and economic expansion.",
    read_all_stories: "Read All Stories",
    upcoming_summits_title: "Upcoming Summits & Plant Tours",
    upcoming_summits_sub: "Where Querétaro's industrial leaders and procurement executives connect.",
    all_events_btn: "All Events",
    learn_masterclasses_title: "Learn & Industrial Masterclasses",
    learn_masterclasses_sub: "Advanced compliance, AI vision, and USMCA strategy taught by local plant leaders.",
    explore_courses_btn: "Explore Courses",
    people_to_know_title: "People to Know in Querétaro",
    people_to_know_sub: "Conversations with the founders, plant directors, and innovators shaping the Bajío.",
    join_community_title: "Bring Your Querétaro Business into the Spotlight",
    join_community_sub: "Get a professional modular mini-site, publish RFQs, receive direct WhatsApp inquiries from OEM buyers, and participate in exclusive networking.",
    apply_mini_site_btn: "Apply for Member Mini-Site",
    try_ai_concierge_btn: "Try AI Concierge",

    // Business Layers (3 Business Layers)
    layer_all: "Complete Ecosystem",
    layer_all_desc: "The complete economic ecosystem operating inside and around Querétaro's industrial parks.",
    layer_industrial: "Industrial & Supply Chain",
    layer_industrial_desc: "Precision manufacturing, tooling, 5-axis CNC, robotics, plastics, spec plants, and cleanrooms.",
    layer_services: "Business Services",
    layer_services_desc: "IMMEX customs & tax advisory, plant technical staffing, armed cargo escort, and legal compliance.",
    layer_amenities: "Park Services & Amenities",
    layer_amenities_desc: "Certified industrial canteens, 24/7 urgent care clinics, corporate wellness gyms, and executive suites.",
    layer_filter_label: "Ecosystem Layer",
    view_layer_ecosystem: "Explore the 3 Business Layers",
    badge_industrial: "INDUSTRIAL & SUPPLY CHAIN",
    badge_services: "BUSINESS SERVICES",
    badge_amenities: "PARK SERVICES & AMENITIES",

    // Directory
    dir_title: "Querétaro B2B Directory",
    dir_sub: "Explore verified manufacturing suppliers, automation integrators, bonded logistics providers, and professional services across the state's 18 industrial parks.",
    filter_search_label: "Search Capability / Name",
    filter_search_placeholder: "e.g. 5-Axis, Autoclave, C-TPAT...",
    filter_cluster_label: "Industrial Cluster",
    filter_zone_label: "Industrial Zone",
    filter_cert_label: "Certification Standard",
    showing_companies: "Showing",
    verified_in_qro: "verified businesses in Querétaro",
    clear_filters: "Clear All Filters",
    all_zones: "All Zones",
    any_cert: "Any Certification",
    no_matches_title: "No businesses match your exact filter combination",
    no_matches_sub: "Try clearing specific certification filters or launch the interactive AI Matchmaker.",

    // Business Profile
    verified_member: "Verified Member",
    workforce: "Workforce:",
    established: "Established:",
    website: "Website:",
    download_spec_sheet: "Download Capability Sheet (PDF)",
    strategic_positioning: "Strategic Positioning & Core Problem Solved",
    our_positioning: "Our One-Line Positioning",
    problem_we_solve: "Problem We Solve for Clients",
    ideal_customer: "Ideal Customer Profile (ICP)",
    tech_differentiator: "Key Technical Differentiator",
    plant_facilities: "Plant Facilities & Machine Park",
    facilities_sub: "Installed manufacturing assets and testing laboratories operating in Querétaro.",
    core_services: "Core Capabilities & Services",
    case_studies_title: "Proven Case Studies & Client Results",
    key_impact: "Key Impact",
    intra_platform_exchange: "Intra-Platform Supply Chain Exchange",
    what_buying_now: "What this company is Buying / Seeking Now:",
    respond_offer: "Respond with Supplier Offer",
    key_leadership: "Key Leadership & Contact",
    official_certs: "Official Certifications",
    other_suppliers_in_cluster: "Other Verified Querétaro Suppliers in",
    request_rfq_btn: "Request Quote / RFQ",

    // Opportunities
    opp_title: "Business Opportunities & RFQs",
    opp_sub: "Direct buyer procurement tenders, open 5-axis CNC machining capacity, joint venture consortiums, and supplier requests in Querétaro.",
    post_opp_btn: "Post a Need or RFQ",
    all_opps: "All Opportunities",
    opp_rfq: "📋 Request for Quote (RFQs)",
    opp_need: "🔍 I Need / Buying",
    opp_offer: "⚡ Available Capacity & Offers",
    opp_partner: "🤝 Strategic Partnerships",
    key_specs: "Key Specifications:",
    budget_value: "Budget / Value:",
    submit_bid: "Submit Bid / Respond",

    // Events
    events_title: "Querétaro B2B Events & Summits",
    events_sub: "“Networking should not end when the event ends.” Register for upcoming executive summits, plant tours, and access post-event collaboration archives.",
    event_rsvp_btn: "Reserve Delegate Pass (Free for Members)",
    connect_attendees_btn: "Connect with Event Attendees",
    post_event_archive: "After-Event Networking Archive",
    key_takeaways: "Key Outcomes & Executive Takeaways",
    event_photos: "Event Photography:",
    download_report: "Download Complete Post-Event Report",
    official_agenda: "Official Summit Agenda",
    speakers_title: "Featured Speakers & Moderators",
    participating_companies: "Participating Companies",
    venue_location: "Venue & Location",

    // Learn
    learn_title: "Learn: Bajío Industrial Masterclasses",
    learn_sub: "Practical courses, technical workshops, and regulatory compliance seminars taught by active plant directors, aerospace engineers, and trade attorneys in Querétaro.",
    enroll_btn: "Enroll Cohort",
    instructor_label: "Instructor:",
    syllabus_label: "Syllabus Highlights:",

    // Footer
    footer_desc: "The modern business discovery, editorial publication, and opportunity ecosystem for Querétaro's industrial and aerospace economy.",
    key_ecosystems: "Key Ecosystems",
    platform_tools: "Platform & Tools",
    qro_hub: "Querétaro Hub",
    qro_hub_desc: "Covering Parque Aeroespacial, PIQ Santa Rosa, El Marqués, Balvanera, and Juriquilla Innovation Corridor.",
    copyright: "© 2026 Red Empresarial QRO. All demo data for prototype."
  }
};

export function getLang() {
  return currentLang;
}

export function t(key) {
  const langPack = translations[currentLang] || translations["es"];
  return langPack[key] || translations["es"][key] || key;
}

export function setLanguage(lang) {
  if (lang !== "es" && lang !== "en") return;
  currentLang = lang;
  localStorage.setItem("pulso_lang", lang);
  window.dispatchEvent(new CustomEvent("pulso-lang-change", { detail: { lang } }));
}

export function getLocalized(item, field) {
  if (!item) return "";
  if (currentLang === "en") {
    return item[`${field}_en`] || item[field] || "";
  }
  return item[field] || "";
}
