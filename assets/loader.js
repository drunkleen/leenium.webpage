(() => {
  const topbar = document.querySelector('.topbar');
  const topbarInner = document.querySelector('.topbar-inner');
  const nav = document.querySelector('.nav');

  if (topbar && topbarInner && nav) {
    const button = document.createElement('button');
    const backdrop = document.createElement('div');
    const label = document.createElement('span');
    button.type = 'button';
    button.className = 'nav-toggle';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'primary-navigation');
    button.setAttribute('aria-label', 'Open navigation menu');
    button.innerHTML = `
      <span class="nav-toggle-bars" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </span>
    `;
    label.className = 'nav-toggle-label';
    label.textContent = 'Menu';
    button.appendChild(label);

    if (!nav.id) {
      nav.id = 'primary-navigation';
    }

    backdrop.className = 'nav-backdrop';

    topbarInner.insertBefore(button, nav);
    topbar.after(backdrop);

    const closeNav = () => {
      topbar.classList.remove('is-nav-open');
      backdrop.classList.remove('is-visible');
      document.body.classList.remove('has-nav-open');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Open navigation menu');
      nav.setAttribute('aria-hidden', 'true');
      label.textContent = 'Menu';
      button.focus();
    };

    const openNav = () => {
      topbar.classList.add('is-nav-open');
      backdrop.classList.add('is-visible');
      document.body.classList.add('has-nav-open');
      button.setAttribute('aria-expanded', 'true');
      button.setAttribute('aria-label', 'Close navigation menu');
      nav.setAttribute('aria-hidden', 'false');
      label.textContent = 'Close';
      window.requestAnimationFrame(() => {
        nav.querySelector('a')?.focus();
      });
    };

    nav.setAttribute('aria-hidden', 'true');

    button.addEventListener('click', () => {
      if (topbar.classList.contains('is-nav-open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    nav.addEventListener('click', (event) => {
      if (event.target instanceof HTMLElement && event.target.closest('a')) {
        closeNav();
      }
    });

    backdrop.addEventListener('click', closeNav);

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Tab' && topbar.classList.contains('is-nav-open')) {
        const focusables = [button, ...Array.from(nav.querySelectorAll('a'))];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
          return;
        }

        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
          return;
        }

        if (!focusables.includes(document.activeElement)) {
          event.preventDefault();
          first.focus();
        }
      }

      if (event.key === 'Escape') {
        closeNav();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) {
        closeNav();
      }
    });
  }

  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.setAttribute('aria-hidden', 'true');
  loader.innerHTML = `
    <div class="page-loader-card">
      <div class="page-loader-mark"></div>
      <div class="page-loader-title">Leenium</div>
      <div class="page-loader-subtitle">Loading palette</div>
    </div>
  `;

  document.body.appendChild(loader);

  const hide = () => {
    loader.classList.add('is-hidden');
    window.setTimeout(() => loader.remove(), 220);
  };

  if (document.readyState === 'complete') {
    requestAnimationFrame(hide);
  } else {
    window.addEventListener('load', hide, { once: true });
    window.setTimeout(hide, 3500);
  }
})();
