function navigateGerenciadorPanel(panel) {
  document.querySelectorAll('.sidebar-nav button').forEach((btn) => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-nav') === panel) {
      btn.classList.add('active');
    }
  });

  const titles = {
    painel: { overline: 'Gerenciamento', heading: 'Painel de Conteúdo' },
    conteudo: { overline: 'Banco de Questões', heading: 'Conteúdo' },
    categorias: { overline: 'Disciplinas', heading: 'Categorias' },
    usuarios: { overline: 'Equipe e Alunos', heading: 'Usuários' },
    relatorios: { overline: 'Produção de conteúdo', heading: 'Relatórios' }
  };

  const pageOverline = document.querySelector('.page-overline');
  const pageHeading = document.querySelector('.top-bar h1');
  if (pageOverline && titles[panel]) pageOverline.textContent = titles[panel].overline;
  if (pageHeading && titles[panel]) pageHeading.textContent = titles[panel].heading;

  document.querySelectorAll('#page-content .app-page').forEach((page) => {
    page.classList.remove('active-page');
  });

  const targetPage = document.getElementById(`gerenciador-${panel}`);
  if (targetPage) targetPage.classList.add('active-page');
}

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
