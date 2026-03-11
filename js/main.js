'use strict';

/* ============================================================
   NAVBAR — scroll behaviour
   ============================================================ */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();

/* ============================================================
   COUNTDOWN TIMER
   ============================================================ */
(function () {
  const TARGET = new Date('2026-06-20T00:00:00+02:00'); // CET (UTC+2, summer)

  const elDays    = document.getElementById('cd-days');
  const elHours   = document.getElementById('cd-hours');
  const elMinutes = document.getElementById('cd-minutes');

  if (!elDays || !elHours || !elMinutes) return;

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function update() {
    const now  = new Date();
    const diff = TARGET - now;

    if (diff <= 0) {
      elDays.textContent    = '00';
      elHours.textContent   = '00';
      elMinutes.textContent = '00';
      return;
    }

    const totalMinutes = Math.floor(diff / 60000);
    const totalHours   = Math.floor(totalMinutes / 60);
    const days         = Math.floor(totalHours / 24);
    const hours        = totalHours % 24;
    const minutes      = totalMinutes % 60;

    elDays.textContent    = pad(days);
    elHours.textContent   = pad(hours);
    elMinutes.textContent = pad(minutes);
  }

  update();
  setInterval(update, 30000); // update every 30 s (minutes precision)
})();

/* ============================================================
   GALLERY LIGHTBOX
   ============================================================ */
(function () {
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const closeBtn      = document.getElementById('lightboxClose');
  const prevBtn       = document.getElementById('lightboxPrev');
  const nextBtn       = document.getElementById('lightboxNext');

  if (!lightbox) return;

  const items = Array.from(document.querySelectorAll('[data-lightbox]'));
  let currentIndex = -1;

  function open(index) {
    currentIndex = index;
    const href = items[index].getAttribute('href');
    const alt  = items[index].querySelector('img')?.alt || '';
    lightboxImg.src = href;
    lightboxImg.alt = alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lightboxImg.focus?.();
  }

  function close() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
    document.body.style.overflow = '';
    currentIndex = -1;
  }

  function navigate(dir) {
    const next = (currentIndex + dir + items.length) % items.length;
    open(next);
  }

  items.forEach(function (item, i) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      open(i);
    });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', function () { navigate(-1); });
  nextBtn.addEventListener('click', function () { navigate(1); });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   navigate(-1);
    if (e.key === 'ArrowRight')  navigate(1);
  });
})();

/* ============================================================
   SCROLL FADE-IN ANIMATIONS
   ============================================================ */
(function () {
  const targets = document.querySelectorAll(
    '.date-content, .countdown-grid, .countdown-label, .invitation-text, ' +
    '.timeline-item, .location-card, .contact-card, .gallery-item'
  );

  targets.forEach(function (el) {
    el.classList.add('fade-in');
  });

  if (!('IntersectionObserver' in window)) {
    // Fallback: just show everything
    targets.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(function (el) { observer.observe(el); });
})();

/* ============================================================
   SMOOTH SCROLL for nav links (belt-and-suspenders for older browsers)
   ============================================================ */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = document.getElementById('navbar')?.offsetHeight || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();
