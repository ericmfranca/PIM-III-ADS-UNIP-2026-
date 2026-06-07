document.addEventListener('DOMContentLoaded', () => {
  const menuToggles = document.querySelectorAll('.menu-toggle');

  menuToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const aside = document.getElementById('sidebar');
      if (!aside) return;
      const isOpen = aside.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const aside = document.getElementById('sidebar');
      if (aside && aside.classList.contains('open')) {
        aside.classList.remove('open');
        menuToggles.forEach((b) => b.setAttribute('aria-expanded', 'false'));
      }
    }
  });
});
