const questoes = [
  {
    enunciado: 'Em Python, qual palavra-chave é usada para definir uma função?',
    opcoes: ['def', 'fun', 'function', 'void'],
    resposta: 'def'
  },
  {
    enunciado: 'Qual comando SQL filtra grupos após o GROUP BY?',
    opcoes: ['WHERE', 'HAVING', 'SELECT', 'ORDER BY'],
    resposta: 'HAVING'
  },
  {
    enunciado: 'Qual estrutura representa uma sequência ordenada e mutável em Python?',
    opcoes: ['tupla', 'conjunto', 'lista', 'dicionário'],
    resposta: 'lista'
  }
];

let indiceQuestao = 0;

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('nemcolei_current_user') || 'null');
  } catch (error) {
    return null;
  }
}

function renderCurrentUser() {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  const greetingName = document.getElementById('greetingName');
  const sidebarName = document.getElementById('sidebarName');
  const sidebarEmail = document.getElementById('sidebarEmail');

  if (greetingName) greetingName.textContent = currentUser.name.split(' ')[0] || currentUser.name;
  if (sidebarName) sidebarName.textContent = currentUser.name;
  if (sidebarEmail) sidebarEmail.textContent = currentUser.email;
}

function renderQuiz() {
  const questaoAtual = questoes[indiceQuestao];
  const card = document.getElementById('questionCard');

  if (!questaoAtual || !card) {
    return;
  }

  const opcoesHtml = questaoAtual.opcoes
    .map((opcao) => `<label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: #cbd5e1;"><input type="radio" name="resposta" value="${opcao}"> ${opcao}</label><br>`)
    .join('');

  card.innerHTML = `
    <h3 style="color: #e2e8f0; margin-bottom: 16px; font-size: 1.1rem;">${questaoAtual.enunciado}</h3>
    <div style="display: flex; flex-direction: column; gap: 10px;">
      ${opcoesHtml}
    </div>
    <p style="margin-top: 16px; color: #94a3b8; font-size: 0.9rem;">Questão ${indiceQuestao + 1} de ${questoes.length}</p>
  `;

  document.getElementById('btnPrev').disabled = indiceQuestao === 0;
  document.getElementById('btnNext').textContent = indiceQuestao === questoes.length - 1 ? 'Finalizar' : 'Próxima';
}

function quizPrev() {
  if (indiceQuestao > 0) {
    indiceQuestao -= 1;
    renderQuiz();
  }
}

function quizNext() {
  if (indiceQuestao < questoes.length - 1) {
    indiceQuestao += 1;
    renderQuiz();
    return;
  }

  alert('Simulado concluído!');
  navigatePanel('revisao');
}

function toggleSidebar() {
  const aside = document.querySelector('aside');
  if (!aside) return;
  const isOpen = aside.classList.toggle('open');
  const btn = document.querySelector('.menu-toggle');
  if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function logout() {
  localStorage.removeItem('nemcolei_current_user');
  location.href = 'index.testpratica.html';
}

function openCertModal(cert = {}) {
  const modal = document.getElementById('modal-certificate');
  if (!modal) return;
  modal.querySelector('.certificate-recipient').textContent = cert.recipient || 'Daniel Aulicino';
  modal.querySelector('.certificate-course').textContent = cert.course || 'C# Avançado';
  modal.querySelector('.certificate-grade').textContent = cert.grade || '9.2 / 10';
  modal.querySelector('.certificate-hours').textContent = cert.hours || '48h';
  modal.querySelector('.certificate-date').textContent = cert.date || '05/06/2026';
  modal.hidden = false;
  modal.setAttribute('aria-hidden', 'false');
  requestAnimationFrame(() => modal.classList.add('open'));
}

function closeCertModal(event) {
  if (event && event.target !== event.currentTarget) return;
  const modal = document.getElementById('modal-certificate');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  setTimeout(() => {
    modal.hidden = true;
  }, 220);
}

function downloadCertificate() {
  alert('Preparando o certificado para download...');
}

window.addEventListener('DOMContentLoaded', () => {
  renderCurrentUser();
  navigatePanel('painel');
  renderQuiz();

  document.getElementById('btnCloseCertificate')?.addEventListener('click', closeCertModal);
  document.querySelector('.modal-close')?.addEventListener('click', closeCertModal);
  document.getElementById('modal-certificate')?.addEventListener('click', closeCertModal);
  document.getElementById('btnDownloadCertificate')?.addEventListener('click', downloadCertificate);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('modal-certificate');
    if (modal && !modal.hidden) {
      closeCertModal();
    }
  }
});
