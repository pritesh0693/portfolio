/* ============================================
   PRITESH DONGARE — Portfolio Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initProfilePhotos();
  initPreloader();
  initNavbar();
  initMobileNav();
  initTypedText();
  initParticles();
  initScrollReveal();
  initCounters();
  initSkillBars();
  initActiveNav();
  initCursorGlow();
  initBackToTop();
});

/* ---- Theme Toggle ---- */
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const metaTheme = document.querySelector('meta[name="theme-color"]');

  toggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
    metaTheme.setAttribute('content', next === 'light' ? '#f8fafc' : '#0a0a0f');
    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: next } }));
  });
}

/* ---- Profile Photos ---- */
function initProfilePhotos() {
  const heroPhoto = document.getElementById('heroPhoto');
  const aboutPhoto = document.getElementById('aboutPhoto');
  const heroWrap = document.querySelector('.hero-photo-wrap');
  const aboutAvatar = document.querySelector('.profile-avatar');

  function markLoaded(img, container) {
    if (img.complete && img.naturalWidth > 0) {
      container.classList.add('has-photo');
    }
  }

  [heroPhoto, aboutPhoto].forEach((img, i) => {
    const container = i === 0 ? heroWrap : aboutAvatar;
    img.addEventListener('load', () => container.classList.add('has-photo'));
    img.addEventListener('error', () => {
      container.classList.remove('has-photo');
      img.style.display = 'none';
    });
    markLoaded(img, container);
  });

  // Handle education images
  const eduImages = document.querySelectorAll('.edu-bg-img, .college-img');
  eduImages.forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      // Create a subtle placeholder instead of showing broken image
      const container = img.parentElement;
      if (container && !container.querySelector('.image-placeholder')) {
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.style.cssText = `
          width: 100%;
          height: ${img.style.height || '200px'};
          background: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          font-size: 0.875rem;
        `;
        container.appendChild(placeholder);
      }
    });
  });
}

/* ---- Preloader ---- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 400);
  });
  setTimeout(() => preloader.classList.add('hidden'), 3000);
}

/* ---- Navbar scroll effect ---- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---- Mobile Navigation ---- */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

/* ---- Typed Text Effect ---- */
function initTypedText() {
  const el = document.getElementById('typedText');
  const phrases = [
    'PHP Laravel Developer',
    'ERP & HRMS Specialist',
    'Payroll Systems Expert',
    'Government Systems Developer',
    'REST API Architect'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 80;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      delay = 40;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      delay = 80;
    }

    if (!isDeleting && charIndex === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 500;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ---- Particle Background ---- */
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let particleRgb = '129, 140, 248';

  function getParticleColor() {
    const theme = document.documentElement.getAttribute('data-theme');
    return theme === 'light' ? '99, 102, 241' : '129, 140, 248';
  }

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = [];
    particleRgb = getParticleColor();
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${particleRgb}, ${p.opacity})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${particleRgb}, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    animationId = requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animationId);
    resize();
    createParticles();
    draw();
  });

  document.addEventListener('themechange', () => {
    particleRgb = getParticleColor();
  });
}

/* ---- Scroll Reveal ---- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const siblings = entry.target.parentElement.querySelectorAll('.reveal');
          let delay = 0;
          siblings.forEach((sib, idx) => {
            if (sib === entry.target) delay = idx * 100;
          });
          setTimeout(() => entry.target.classList.add('visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
}

/* ---- Counter Animation ---- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counters.forEach(counter => {
            const target = parseInt(counter.dataset.target, 10);
            animateCounter(counter, target);
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) observer.observe(statsSection);
}

function animateCounter(el, target) {
  let current = 0;
  const increment = target / 40;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 40);
}

/* ---- Skill Bars ---- */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.dataset.width;
          entry.target.style.width = width + '%';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  bars.forEach(bar => observer.observe(bar));
}

/* ---- Active Nav Link on Scroll ---- */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ---- Cursor Glow ---- */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.matchMedia('(max-width: 768px)').matches) {
    if (glow) glow.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }

  animateGlow();
}

/* ---- Back to Top ---- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---- Smooth anchor scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
