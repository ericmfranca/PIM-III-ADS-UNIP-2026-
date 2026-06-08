function navigateAdminPanel(panel) {
  document.querySelectorAll('.sidebar-nav button').forEach((btn) => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-nav') === panel) {
      btn.classList.add('active');
    }
  });

  const titles = {
    painel: { overline: 'Painel administrativo', heading: 'Painel do Administrador' },
    relatorios: { overline: 'Relatórios da plataforma', heading: 'Relatórios' }
  };

  const pageOverline = document.querySelector('.page-overline');
  const pageHeading = document.querySelector('.page-heading h1');
  if (pageOverline && titles[panel]) pageOverline.textContent = titles[panel].overline;
  if (pageHeading && titles[panel]) pageHeading.textContent = titles[panel].heading;

  document.querySelectorAll('#page-content .app-page').forEach((page) => {
    page.classList.remove('active-page');
  });

  const targetPage = document.getElementById(`admin-${panel}`);
  if (targetPage) targetPage.classList.add('active-page');
}

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const toggleButton = document.querySelector('.menu-toggle');

  if (!sidebar || !toggleButton) return;

  toggleButton.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    toggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  });
  
});
