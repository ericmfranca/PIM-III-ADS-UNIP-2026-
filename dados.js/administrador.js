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
