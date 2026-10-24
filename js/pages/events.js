import { eventsData } from '../data/events.js';
import { t, getLang, getLocalized } from '../i18n.js';

export function renderEventsPage() {
  const lang = getLang();
  const isEs = lang === "es";

  return `
    <div class="animate-fade-in">
      
      <!-- Events Broadsheet Masthead -->
      <div class="border-b border-outline-variant pb-6 mb-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span class="font-mono-data text-mono-data text-secondary uppercase tracking-widest font-semibold block mb-1">
              ${isEs ? "Agenda de Alta Dirección & Cumbres Industriales del Estado" : "Executive Summits & Industrial Agenda"}
            </span>
            <h1 class="font-headline-lg text-headline-lg text-primary tracking-tight font-medium uppercase">
              ${isEs ? "Cumbres B2B, Networking & Ruedas de Negocio" : "B2B Events, Matchmaking & Summits"}
            </h1>
            <p class="font-headline-sm text-headline-sm italic text-on-surface-variant mt-1 font-normal max-w-3xl">
              ${isEs ? "Encuentros privados con directores generales, compradores Tier 1 de Norteamérica, fondos de capital privado y autoridades del sector industrial." : "Private executive gatherings with Tier 1 procurement directors, plant managers, and institutional funds."}
            </p>
          </div>
          <div class="flex items-center gap-3">
            <button class="bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase px-5 py-3 transition-colors flex items-center gap-2" onclick="window.openTypeformModal('join-community')">
              <span class="material-symbols-outlined text-[16px]">how_to_reg</span>
              <span>${isEs ? "Acreditar Asistencia" : "Accredit Attendance"}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Events List Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        ${eventsData.map((event, idx) => `
          <div class="border border-outline-variant bg-surface-container-lowest p-5 flex flex-col justify-between hover:border-secondary transition-all">
            <div>
              <div class="relative h-48 overflow-hidden mb-4 border border-outline-variant bg-primary-container">
                <img src="${event.coverImage}" alt="${event.title}" class="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-300" />
                <div class="absolute top-2 left-2 flex gap-1.5">
                  <span class="bg-secondary text-on-secondary text-[10px] font-mono-data font-bold uppercase px-2 py-0.5">
                    ${event.status === 'upcoming' ? 'PRÓXIMO' : 'CONCLUIDO'}
                  </span>
                  <span class="bg-primary text-surface-bright text-[10px] font-mono-data font-bold uppercase px-2 py-0.5">
                    ${getLocalized(event, 'category')}
                  </span>
                </div>
              </div>

              <div class="flex items-center justify-between font-mono-data text-xs text-secondary font-bold mb-1">
                <span>📅 ${getLocalized(event, 'date')} · ${event.time}</span>
                <span class="text-on-surface-variant font-mono-data text-[11px]">#0${idx + 1}</span>
              </div>

              <h3 class="font-headline-sm text-lg text-primary mb-2 leading-snug">
                <a href="#/event/${event.slug}" class="hover:text-secondary">${getLocalized(event, 'title')}</a>
              </h3>

              <p class="font-body-sm text-body-sm text-on-surface-variant mb-4 leading-relaxed">
                ${getLocalized(event, 'description')}
              </p>

              <div class="flex items-center gap-1 font-mono-data text-xs text-on-surface-variant mb-4 bg-surface-container-low p-2.5 border-l-2 border-primary">
                <span class="material-symbols-outlined text-[15px] text-secondary">location_on</span>
                <span class="truncate font-semibold text-primary">${event.venue}</span>
              </div>
            </div>

            <div class="pt-4 border-t border-outline-variant flex items-center justify-between">
              <span class="font-mono-data text-xs text-on-surface-variant">
                ${event.attendingCompanies?.length || 12}+ Empresas
              </span>
              <a href="#/event/${event.slug}" class="bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase py-2 px-4 text-center transition-colors flex items-center gap-1.5">
                <span>${event.status === 'upcoming' ? 'Ver Programa & Registro' : 'Ver Memoria'}</span>
                <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
              </a>
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;
}
