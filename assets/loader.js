(() => {
  const topbar = document.querySelector('.topbar');
  const topbarInner = document.querySelector('.topbar-inner');
  const nav = document.querySelector('.nav');

  if (topbar && topbarInner && nav) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'nav-toggle';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'primary-navigation');
    button.innerHTML = `
      <span class="nav-toggle-bars" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <span class="nav-toggle-label">Menu</span>
    `;

    if (!nav.id) {
      nav.id = 'primary-navigation';
    }

    topbarInner.insertBefore(button, nav);

    const closeNav = () => {
      topbar.classList.remove('is-nav-open');
      button.setAttribute('aria-expanded', 'false');
    };

    const openNav = () => {
      topbar.classList.add('is-nav-open');
      button.setAttribute('aria-expanded', 'true');
    };

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

    window.addEventListener('keydown', (event) => {
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
