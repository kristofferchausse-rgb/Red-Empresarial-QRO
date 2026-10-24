import { coursesData } from '../data/courses.js';
import { t, getLang, getLocalized } from '../i18n.js';

export function renderLearnPage() {
  const lang = getLang();
  const isEs = lang === "es";

  return `
    <div class="animate-fade-in">
      
      <!-- Learn Broadsheet Masthead -->
      <div class="border-b border-outline-variant pb-6 mb-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span class="font-mono-data text-mono-data text-secondary uppercase tracking-widest font-semibold block mb-1">
              ${isEs ? "Academia & Capacitación de Alta Especialidad Industrial" : "Executive Academy & Specialization"}
            </span>
            <h1 class="font-headline-lg text-headline-lg text-primary tracking-tight font-medium uppercase">
              ${isEs ? "Academia B2B & Masterclasses Ejecutivas" : "B2B Academy & Executive Masterclasses"}
            </h1>
            <p class="font-headline-sm text-headline-sm italic text-on-surface-variant mt-1 font-normal max-w-3xl">
              ${isEs ? "Formación de alta especialidad impartida por directores generales, auditores AS9100/IATF y consultores fiscales de comercio exterior en Querétaro." : "Executive upskilling taught by C-level executives, certified auditors, and foreign trade advisors in Querétaro."}
            </p>
          </div>
          <div class="flex items-center gap-3">
            <span class="bg-surface-container text-primary font-mono-data text-xs px-3 py-1.5 border border-outline-variant">
              Certificaciones Validadas
            </span>
          </div>
        </div>
      </div>

      <!-- Course Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        ${coursesData.map((course, idx) => `
          <div class="border border-outline-variant bg-surface-container-lowest p-5 flex flex-col justify-between hover:border-secondary transition-all">
            <div>
              <div class="relative h-44 overflow-hidden mb-4 border border-outline-variant bg-primary-container">
                <img src="${course.coverImage}" alt="${course.title}" class="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300" />
                <div class="absolute top-2 left-2 flex gap-1.5">
                  <span class="bg-secondary text-on-secondary text-[10px] font-mono-data font-bold uppercase px-2 py-0.5">
                    ${getLocalized(course, 'level')}
                  </span>
                  <span class="bg-primary text-surface-bright text-[10px] font-mono-data font-bold uppercase px-2 py-0.5">
                    ${getLocalized(course, 'format')}
                  </span>
                </div>
              </div>

              <div class="flex items-center justify-between font-mono-data text-xs text-secondary font-bold mb-1">
                <span>${getLocalized(course, 'category')}</span>
                <span class="text-on-surface-variant font-mono-data text-[11px]">#0${idx + 1}</span>
              </div>

              <h3 class="font-headline-sm text-lg text-primary mb-2 leading-snug">
                ${getLocalized(course, 'title')}
              </h3>

              <p class="font-body-sm text-body-sm text-on-surface-variant mb-4 leading-relaxed">
                ${getLocalized(course, 'description')}
              </p>

              <!-- Instructor Bio -->
              <div class="border border-outline-variant bg-surface-container-low p-3 flex items-center gap-3 mb-4">
                <img src="${course.instructor.avatar}" alt="${course.instructor.name}" class="w-10 h-10 border border-outline-variant object-cover" />
                <div>
                  <div class="font-headline-sm text-sm text-primary font-bold">${course.instructor.name}</div>
                  <div class="font-mono-data text-[11px] text-on-surface-variant">${getLocalized(course.instructor, 'role')}</div>
                </div>
              </div>

              <!-- Syllabus -->
              <div class="bg-surface-container-low p-3 mb-4 border-l-2 border-secondary">
                <div class="font-label-caps text-[10px] text-secondary uppercase font-bold mb-1">Temario Destacado:</div>
                <ul class="font-mono-data text-xs text-primary space-y-1">
                  ${course.syllabus.slice(0, 2).map(s => `<li>• ${s}</li>`).join('')}
                </ul>
              </div>
            </div>

            <div class="pt-3 border-t border-outline-variant flex items-center justify-between">
              <div>
                <div class="font-mono-data text-[10px] uppercase text-on-surface-variant">Inversión</div>
                <div class="font-mono-metric text-base font-bold text-secondary">${getLocalized(course, 'price')}</div>
              </div>
              <button class="bg-primary text-background hover:bg-secondary font-label-caps text-label-caps uppercase py-2 px-4 transition-colors flex items-center gap-1.5" onclick="window.handleEnrollCourse('${course.id}')">
                <span>Inscribirme</span>
                <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;
}

window.handleEnrollCourse = function(courseId) {
  alert("¡Inscripción confirmada! Le hemos enviado el temario completo y enlace de acceso a su correo institucional.");
};
