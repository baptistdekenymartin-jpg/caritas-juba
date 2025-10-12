console.log('Caritas Juba v3-integrated-v2 loaded');

// === Active pill highlight on scroll ===
(function(){
  const links = Array.from(document.querySelectorAll('.programs-nav a'));
  if(!links.length) return;
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  links.forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if(!t) return;
      e.preventDefault();
      t.scrollIntoView({behavior:'smooth', block:'start'});
      history.replaceState(null,'',a.getAttribute('href'));
    });
  });

  const activate = id => {
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
  };

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{ if(en.isIntersecting) activate(en.target.id); });
  }, {root:null, rootMargin:'-120px 0px -60% 0px', threshold:0.1});

  sections.forEach(sec => observer.observe(sec));
})();


// === Horizontal pills active highlight ===
(function(){
  const links = Array.from(document.querySelectorAll('.programs-tabs a'));
  if(!links.length) return;
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  links.forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if(!t) return;
      e.preventDefault();
      t.scrollIntoView({behavior:'smooth', block:'start'});
      history.replaceState(null,'',a.getAttribute('href'));
    });
  });

  const activate = id => {
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
  };

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{ if(en.isIntersecting) activate(en.target.id); });
  }, {root:null, rootMargin:'-140px 0px -60% 0px', threshold:0.1});

  sections.forEach(sec => observer.observe(sec));
})();


// === Responsive navigation ===
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const toggle = header.querySelector('.nav-toggle');
  const drawer = header.querySelector('.nav-drawer');
  const backdrop = header.querySelector('.nav-backdrop');
  const closeBtn = header.querySelector('.nav-close');
  const navLinks = Array.from(header.querySelectorAll('.nav-link'));
  if (toggle) {
    toggle.dataset.open = toggle.dataset.open || 'false';
    if (!toggle.hasAttribute('aria-expanded')) toggle.setAttribute('aria-expanded','false');
  }
  if (drawer && !drawer.hasAttribute('aria-hidden')) drawer.setAttribute('aria-hidden','true');
  const focusableSelectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let lastFocused = null;

  const openNav = () => {
    lastFocused = document.activeElement;
    if (toggle) {
      toggle.dataset.open = 'true';
      toggle.setAttribute('aria-expanded', 'true');
    }
    if (drawer) { drawer.dataset.open = 'true'; drawer.setAttribute('aria-hidden','false'); }
    if (backdrop) {
      backdrop.hidden = false;
      backdrop.dataset.open = 'true';
    }
    const focusable = drawer ? Array.from(drawer.querySelectorAll(focusableSelectors)) : [];
    if (focusable.length) focusable[0].focus();
    document.body.style.overflow = 'hidden';
  };

  const closeNav = () => {
    if (toggle) {
      toggle.dataset.open = 'false';
      toggle.setAttribute('aria-expanded', 'false');
    }
    if (drawer) { delete drawer.dataset.open; drawer.setAttribute('aria-hidden','true'); }
    if (backdrop) {
      delete backdrop.dataset.open;
      backdrop.hidden = true;
    }
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  };

  const trapFocus = (event) => {
    if (!drawer || !drawer.dataset.open) return;
    const focusable = Array.from(drawer.querySelectorAll(focusableSelectors));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  const onEscape = (event) => {
    if (event.key === 'Escape' && drawer && drawer.dataset.open) {
      closeNav();
    }
  };

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = drawer && drawer.dataset.open === 'true';
      isOpen ? closeNav() : openNav();
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  if (backdrop) backdrop.addEventListener('click', closeNav);
  navLinks.forEach((link) => link.addEventListener('click', closeNav));

  document.addEventListener('keydown', onEscape);
  if (drawer) drawer.addEventListener('keydown', trapFocus);

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  });

  const mq = window.matchMedia('(min-width: 960px)');
  const handleMediaChange = (event) => {
    if (event.matches) {
      closeNav();
    }
  };
  if (mq.addEventListener) {
    mq.addEventListener('change', handleMediaChange);
  } else {
    mq.addListener(handleMediaChange);
  }
})();

// === Header scroll animation toggle ===
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const threshold = 12;
  const onScroll = () => {
    const shouldElevate = window.scrollY > threshold;
    header.classList.toggle('is-scrolled', shouldElevate);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// === Program cards "See more" toggle ===
(function(){
  const toggles = document.querySelectorAll('.toggle-more');
  if(!toggles.length) return;

  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.program-card');
      if(!card) return;
      const expandThis = !card.classList.contains('is-expanded');

      toggles.forEach(otherBtn => {
        const otherCard = otherBtn.closest('.program-card');
        if(!otherCard) return;
        const isActive = otherBtn === btn && expandThis;
        otherCard.classList.toggle('is-expanded', isActive);
        otherBtn.setAttribute('aria-expanded', String(isActive));
        otherBtn.textContent = isActive ? 'See less' : 'See more';
        const more = otherCard.querySelector('.more-info');
        if(more){
          more.hidden = !isActive;
        }
      });
    });
  });
})();

/* === NAV HOTFIX (link behavior + close-on-click) === */
(function () {
  const drawer = document.querySelector('.site-header .nav-drawer');
  const toggle = document.querySelector('.site-header .nav-toggle');
  const backdrop = document.querySelector('.nav-backdrop');
  if (!drawer) return;

  const closeNav = () => {
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    if (backdrop) backdrop.setAttribute('data-open', 'false');
    document.body.style.overflow = '';
  };

  // Make nav links work for both hash (#section) and normal pages
  document.querySelectorAll('.site-header .nav-link').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href') || '';
      const isHash = href.startsWith('#');

      // Only prevent default for in-page anchors that actually exist
      if (isHash) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

      // Always close the drawer after choosing a link
      closeNav();
    });
  });

  // Also close when the backdrop is tapped
  if (backdrop) backdrop.addEventListener('click', closeNav);
})();



