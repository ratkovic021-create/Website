/* ================================================================
   LUMA Beauty Studio — Interactions
   ================================================================ */

/* ── Scroll reveal ──────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ── Header scroll state ────────────────────────────────────── */
const header = document.getElementById('header');
window.addEventListener(
  'scroll',
  () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  },
  { passive: true }
);

/* ── Mobile nav ─────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(open));
  mobileNav.classList.toggle('open', open);
  mobileNav.setAttribute('aria-hidden', String(!open));
});

mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
  });
});

/* ── Smooth scroll (offset for fixed header) ────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = header.offsetHeight + 12;
    window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - offset, behavior: 'smooth' });
  });
});

/* ── Contact form ───────────────────────────────────────────── */
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = form.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Slanje…';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '✓ Upit poslat!';
    btn.style.background = '#4a7a5a';

    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
    }, 3200);
  }, 1100);
});

/* ── Marquee pause on hover ─────────────────────────────────── */
const marqueeInner = document.querySelector('.marquee__inner');
if (marqueeInner) {
  marqueeInner.addEventListener('mouseenter', () => {
    marqueeInner.style.animationPlayState = 'paused';
  });
  marqueeInner.addEventListener('mouseleave', () => {
    marqueeInner.style.animationPlayState = 'running';
  });
}

/* ── Animate stat counters ──────────────────────────────────── */
function countUp(el, target, decimals = 0, duration = 1400) {
  const start = performance.now();
  const run = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = (ease * target).toFixed(decimals);
    if (p < 1) requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
}

const statsSection = document.querySelector('.hero__stats');
let statsAnimated = false;

if (statsSection) {
  new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;

        const configs = [
          { selector: '.hero__stat:nth-child(1) .hero__stat-n', target: 800, suffix: '+', decimals: 0 },
          { selector: '.hero__stat:nth-child(3) .hero__stat-n', target: 6,   suffix: '+', decimals: 0 },
          { selector: '.hero__stat:nth-child(5) .hero__stat-n', target: 4.9, suffix: '<sup class="gold-sup">★</sup>', decimals: 1 },
        ];

        configs.forEach(({ selector, target, suffix, decimals }) => {
          const el = document.querySelector(selector);
          if (!el) return;
          const start = performance.now();
          const dur   = 1400;
          const run   = (now) => {
            const p    = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            const val  = (ease * target).toFixed(decimals);
            el.innerHTML = val + suffix;
            if (p < 1) requestAnimationFrame(run);
          };
          requestAnimationFrame(run);
        });
      }
    },
    { threshold: 0.6 }
  ).observe(statsSection);
}
