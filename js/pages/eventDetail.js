import { eventsData } from '../data/events.js';
import { renderSocialShareBar } from '../components/socialShare.js';
import { t, getLang, getLocalized } from '../i18n.js';

export function renderEventDetailPage(slug) {
  const lang = getLang();
  const isEs = lang === "es";
  const event = eventsData.find(e => e.slug === slug) || eventsData[0];
  const isUpcoming = event.status === "upcoming";

  return `
    <div class="animate-fade-in">
      
      <!-- Event Broadsheet Top Navigation -->
      <div class="border-b border-outline-variant pb-4 mb-6 flex items-center justify-between font-mono-data text-mono-data">
        <a href="#/events" class="text-secondary hover:underline flex items-center gap-1 font-bold">
          <span class="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>${isEs ? "Volver a Calendario de Eventos" : "Back to Events Calendar"}</span>
        </a>
        <span class="bg-surface-container px-2.5 py-0.5 text-[11px] font-label-caps uppercase border-l-2 border-secondary font-bold">
          ${getLocalized(event, 'category')}
        </span>
      </div>

      <!-- Event Header Spread -->
      <section class="border border-outline-variant bg-surface-container-lowest mb-8 shadow-sm">
        <div class="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
          
          <div class="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-outline-variant">
            <div>
              <div class="flex items-center gap-2 mb-3">
                <span class="bg-secondary text-on-secondary text-[11px] font-label-caps uppercase px-2.5 py-0.5 font-bold">
                  ${isUpcoming ? "CONVOCATORIA ABIERTA" : "MEMORIA DEL EVENTO"}
                </span>
                <span class="bg-surface-container text-primary text-[11px] font-label-caps uppercase px-2 py-0.5 font-bold border-l-2 border-primary">
                  ${event.venue}
                </span>
              </div>

              <span class="font-mono-data text-mono-data text-secondary uppercase font-bold tracking-widest block mb-1">
                EVENTO CUMBRE · CONVOCATORIA EXCLUSIVA
              </span>

              <h1 class="font-headline-lg text-3xl sm:text-4xl text-primary tracking-tight font-medium mb-3">
                ${getLocalized(event, 'title')}
              </h1>

              <p class="font-body-md text-body-md text-on-surface-variant mb-4 leading-relaxed">
                ${getLocalized(event, 'description')}
              </p>
            </div>

            <div>
              <!-- Date & Location Metrics Strip -->
              <div class="grid grid-cols-3 gap-3 pt-4 border-t border-outline-variant bg-surface-container-low p-3.5 mb-5 font-mono-data text-xs">
                <div>
                  <div class="text-on-surface-variant">Fecha</div>
                  <div class="text-primary font-bold text-sm mt-0.5">${getLocalized(event, 'date')}</div>
                </div>
                <div>
                  <div class="text-on-surface-variant">Horario</div>
                  <div class="text-secondary font-bold text-sm mt-0.5">${event.time}</div>
                </div>
                <div>
                  <div class="text-on-surface-variant">Sede</div>
                  <div class="text-primary font-bold text-sm mt-0.5">${event.venue}</div>
                </div>
              </div>

              <!-- Main Action -->
              <div class="flex items-center gap-3">
                ${isUpcoming ? `
                  <button class="bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase py-3 px-6 transition-colors flex items-center gap-2" onclick="window.handleEventRsvp('${event.id}')">
                    <span class="material-symbols-outlined text-[16px]">how_to_reg</span>
                    <span>${isEs ? "Acreditar Asistencia de Delegado" : "Register Delegate Pass"}</span>
                  </button>
                ` : `
                  <button class="bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase py-3 px-6 transition-colors flex items-center gap-2" onclick="window.showToast('Descargando Memoria Ejecutiva...')">
                    <span class="material-symbols-outlined text-[16px]">download</span>
                    <span>Descargar Memoria en PDF</span>
                  </button>
                `}
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 relative flex flex-col justify-end min-h-[300px] lg:min-h-full overflow-hidden bg-primary-container">
            <img src="${event.coverImage}" alt="${event.title}" class="absolute inset-0 w-full h-full object-cover filter contrast-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent"></div>
          </div>
        </div>
      </section>

      <!-- Main Layout: 8 Cols Details + 4 Cols Attending Network -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg mb-12">
        
        <div class="lg:col-span-8 space-y-8">
          
          <!-- Keynote Speakers -->
          <div class="border border-outline-variant bg-surface-container-lowest p-6 sm:p-8">
            <div class="flex items-center gap-2 mb-4 pb-2 border-b border-outline-variant">
              <span class="material-symbols-outlined text-secondary text-[20px]">record_voice_over</span>
              <h2 class="font-headline-sm text-headline-sm text-primary">
                ${isEs ? "Ponentes Principales & Panelistas" : "Keynote Speakers & Panelists"}
              </h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${event.speakers.map(spk => `
                <div class="border border-outline-variant bg-surface-container-low p-4 flex items-center gap-3">
                  <img src="${spk.photo}" alt="${spk.name}" class="w-12 h-12 border border-outline-variant object-cover" />
                  <div>
                    <div class="font-headline-sm text-base text-primary font-bold">${spk.name}</div>
                    <div class="font-mono-data text-xs text-secondary mt-0.5">${spk.role}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Official Agenda -->
          ${event.agenda && event.agenda.length > 0 ? `
            <div class="border border-outline-variant bg-surface-container-lowest p-6 sm:p-8">
              <div class="flex items-center gap-2 mb-4 pb-2 border-b border-outline-variant">
                <span class="material-symbols-outlined text-secondary text-[20px]">schedule</span>
                <h2 class="font-headline-sm text-headline-sm text-primary">
                  ${isEs ? "Programa de Sesiones & Citas B2B" : "Official Agenda & Matchmaking Sessions"}
                </h2>
              </div>

              <div class="space-y-3">
                ${event.agenda.map(item => `
                  <div class="border-b border-outline-variant pb-3 flex items-start gap-4">
                    <div class="font-mono-data text-xs font-bold text-secondary w-24 shrink-0">${item.time}</div>
                    <div class="font-body-md text-primary font-medium">${item.title}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

        </div>

        <!-- Right 4 Columns -->
        <div class="lg:col-span-4 space-y-6">
          <div class="border border-outline-variant bg-surface-container-lowest p-6">
            <span class="font-mono-data text-mono-data text-secondary uppercase font-bold tracking-widest block mb-2">
              ORGANIZACIONES CONFIRMADAS
            </span>
            <p class="font-body-sm text-xs text-on-surface-variant mb-4">
              Directores de compras y ejecutivos de las siguientes empresas:
            </p>
            <div class="space-y-2">
              ${event.attendingCompanies.map(comp => `
                <div class="border border-outline-variant bg-surface-container-low p-2.5 flex items-center gap-2 font-mono-data text-xs">
                  <span class="material-symbols-outlined text-secondary text-[16px]">verified</span>
                  <span class="text-primary font-semibold">${comp}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="border border-outline-variant bg-surface-container-lowest p-4">
            ${renderSocialShareBar(getLocalized(event, 'title'), window.location.href, ["Querétaro", "B2B", "Cumbre"])}
          </div>
        </div>

      </div>

    </div>
  `;
}

window.handleEventRsvp = function(eventId) {
  alert("¡Pase de Delegado Confirmado! El Comité Organizador le ha enviado el código QR de acceso a su correo.");
};
