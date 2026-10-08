/* ══════════════════════════════════════════════════════
   ARTE&PROGRAMACION — GAES 8
   Lógica principal de la aplicación
   ══════════════════════════════════════════════════════ */

// ─── Año automático en el footer ──────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ─── Referencias al DOM ───────────────────────────────
const mainContent = document.getElementById('mainContent');
const links       = document.querySelectorAll('.nav-links a');
const sections    = document.querySelectorAll('section');


// ─── NAVEGACIÓN ENTRE SECCIONES ───────────────────────
function showSection(id) {
  // Ocultar todas las secciones
  sections.forEach(sec => {
    sec.style.display = 'none';
    sec.classList.remove('active');
  });

  // Mostrar la sección objetivo con animación
  const target = document.getElementById(id);
  if (target) {
    target.style.display = 'block';
    requestAnimationFrame(() => target.classList.add('active'));
  }

  // Marcar el link activo en el navbar
  links.forEach(l => l.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-links a[data-section="${id}"]`);
  if (activeLink) activeLink.classList.add('active');
}

// Asignar eventos a los links del navbar
links.forEach(link => {
  link.addEventListener('click', () => {
    showSection(link.getAttribute('data-section'));
  });
});

// Asignar eventos a los links del footer
document.querySelectorAll('[data-section-footer]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(a.getAttribute('data-section-footer'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// ─── COPIAR COLOR AL PORTAPAPELES ─────────────────────
function copyColor(hex, card) {
  const toast = document.getElementById('copy-toast');

  navigator.clipboard.writeText(hex).then(() => {
    toast.textContent = hex + ' copiado al portapapeles';
    toast.classList.add('show');
    card.style.outline = '3px solid ' + hex;

    setTimeout(() => {
      toast.classList.remove('show');
      card.style.outline = '';
    }, 1800);

  }).catch(() => {
    // Fallback si clipboard API no está disponible
    toast.textContent = hex;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
  });
}
// Mostrar la sección de introducción al cargar
showSection('intro');