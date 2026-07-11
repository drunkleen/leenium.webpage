(() => {
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
