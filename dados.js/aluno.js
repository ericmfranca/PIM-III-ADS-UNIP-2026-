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

const painelData = {
  xp: {
    current: 1850,
    target: 2500,
    currentLevel: 3,
    levelTitle: 'Estudioso',
    streakDays: 7
  },
  discipline: {
    name: 'Matemática',
    completion: 100,
    accuracy: 82
  },
  conquests: {
    total: 8,
    list: [
      { name: 'Explorador de Matemática', unlocked: true },
      { name: 'Explorador de C#', unlocked: true },
      { name: 'Explorador de SQL', unlocked: false },
      { name: 'Inabalável', unlocked: true }
    ]
  },
  assessments: [
    { title: 'Simulado PIM III', sub: 'Banco de Dados & Engenharia', tag: 'Disponível' },
    { title: 'Estruturas de Dados', sub: 'Linguagem C e Vetores', tag: 'Revisar' },
    { title: 'Programação Orientada a Objetos', sub: 'Fundamentos em Java', tag: 'Pendente' }
  ]
};

function renderPainelData() {
  const data = painelData;

  const current = document.getElementById('currentXpDisplay');
  const target = document.getElementById('targetXpDisplay');
  const levelTitle = document.getElementById('levelTitle');
  const levelNumber = document.getElementById('levelNumber');
  const xpBar = document.getElementById('xpBar');
  const streakLabel = document.getElementById('streakLabel');

  if (current) current.textContent = `${data.xp.current.toLocaleString('pt-BR')} XP`;
  if (target) target.textContent = `${data.xp.target.toLocaleString('pt-BR')} XP`;
  if (levelTitle) levelTitle.textContent = data.xp.levelTitle;
  if (levelNumber) levelNumber.textContent = `Nível ${data.xp.currentLevel}`;
  if (streakLabel) streakLabel.textContent = `${data.xp.streakDays} Dias Seguidos`;
  if (xpBar) {
    const percentage = Math.min(100, Math.round((data.xp.current / data.xp.target) * 100));
    xpBar.style.width = `${percentage}%`;
  }

  const percentageText = document.getElementById('percentageText');
  const chartCenterData = document.getElementById('chartCenterData');
  const pieChart = document.getElementById('pieChart');
  if (percentageText) percentageText.textContent = `${data.discipline.completion}%`;
  if (chartCenterData) chartCenterData.textContent = `${data.discipline.accuracy}%`;
  if (pieChart) {
    const fillValue = Math.min(Math.max(data.discipline.accuracy, 0), 100);
    pieChart.style.background = `conic-gradient(var(--color-accent) ${fillValue}%, var(--color-surface-light) 0%)`;
  }

  const avaliacoesList = document.getElementById('avaliacoesList');
  if (avaliacoesList) {
    avaliacoesList.innerHTML = data.assessments.map((item) => `
      <article class="pill-item" style="justify-content: space-between;">
        <div>
          <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: 0.35rem;">${item.title}</h4>
          <p class="card-subtitle">${item.sub}</p>
        </div>
        <span class="status-tag">${item.tag}</span>
      </article>
    `).join('');
  }

  const conquestCount = document.getElementById('conquestCount');
  const conquestsList = document.getElementById('conquestsList');
  const unlockedCount = data.conquests.list.filter((c) => c.unlocked).length;
  if (conquestCount) conquestCount.textContent = `${unlockedCount} de ${data.conquests.total}`;
  if (conquestsList) {
    conquestsList.innerHTML = data.conquests.list.map((c) => `
      <article class="pill-item ${c.unlocked ? '' : 'locked'}">
        <span style="font-weight: 500; font-size: 0.95rem;">${c.name}</span>
        <span class="status-tag">${c.unlocked ? 'Desbloqueada' : 'Bloqueada'}</span>
      </article>
    `).join('');
  }
}

function abrirCertificadoMateria() {
  const currentUser = getCurrentUser();
  openCertModal({
    recipient: currentUser ? currentUser.name : 'Aluno',
    course: painelData.discipline.name,
    grade: `${painelData.discipline.accuracy} / 100`
  });
}

let respostasSimulado = [];

function iniciarSimulado() {
  indiceQuestao = 0;
  respostasSimulado = new Array(questoes.length).fill(null);

  const container = document.getElementById('simuladoContainer');
  if (!container) return;

  container.innerHTML = `
    <p class="eyebrow">Simulado em andamento</p>
    <h2>Python — Fundamentos</h2>
    <div id="questionCard" style="margin-top: 24px; padding: 20px; background: rgba(18, 20, 28, 0.5); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 12px;"></div>
    <div style="margin-top: 20px; display: flex; gap: 10px;">
      <button id="btnPrev" class="btn-action btn-outline" type="button" onclick="quizPrev()">Anterior</button>
      <button id="btnNext" class="btn-action" type="button" onclick="quizNext()" style="background: #c0ff00; color: #000; font-weight: 600;">Próxima</button>
    </div>
  `;

  renderQuiz();
}

function renderQuiz() {
  const questaoAtual = questoes[indiceQuestao];
  const card = document.getElementById('questionCard');

  if (!questaoAtual || !card) {
    return;
  }

  const respostaSelecionada = respostasSimulado[indiceQuestao];

  const opcoesHtml = questaoAtual.opcoes
    .map((opcao) => `<label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: #cbd5e1;"><input type="radio" name="resposta" value="${opcao}" onchange="selecionarResposta('${opcao}')" ${respostaSelecionada === opcao ? 'checked' : ''}> ${opcao}</label>`)
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

function selecionarResposta(opcao) {
  respostasSimulado[indiceQuestao] = opcao;
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

  finalizarSimulado();
}

function finalizarSimulado() {
  const total = questoes.length;
  let acertos = 0;
  questoes.forEach((questao, index) => {
    if (respostasSimulado[index] === questao.resposta) acertos += 1;
  });

  const percentual = Math.round((acertos / total) * 100);
  const xpGanho = acertos * 20;
  const certificadoLiberado = percentual >= 80;

  const container = document.getElementById('simuladoContainer');
  if (!container) return;

  container.innerHTML = `
    <p class="eyebrow">Resultado do Simulado</p>
    <h2>Python — Fundamentos</h2>

    <div style="margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
      <div style="padding: 20px; background: rgba(18, 20, 28, 0.5); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 12px; text-align: center;">
        <p style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 8px;">Acertos</p>
        <h3 style="color: #c0ff00; font-size: 2rem; font-weight: 700;">${acertos} / ${total}</h3>
      </div>
      <div style="padding: 20px; background: rgba(18, 20, 28, 0.5); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 12px; text-align: center;">
        <p style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 8px;">Aproveitamento</p>
        <h3 style="color: #818cf8; font-size: 2rem; font-weight: 700;">${percentual}%</h3>
      </div>
      <div style="padding: 20px; background: rgba(18, 20, 28, 0.5); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 12px; text-align: center;">
        <p style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 8px;">XP Ganho</p>
        <h3 style="color: #fbbf24; font-size: 2rem; font-weight: 700;">+${xpGanho}</h3>
      </div>
    </div>

    <div style="margin-top: 20px; padding: 16px; border-radius: 10px; ${certificadoLiberado ? 'background: rgba(192, 255, 0, 0.08); border: 1px solid rgba(192, 255, 0, 0.2);' : 'background: rgba(148, 163, 184, 0.08); border: 1px solid rgba(148, 163, 184, 0.2);'}">
      <p style="color: ${certificadoLiberado ? '#c0ff00' : '#94a3b8'}; font-weight: 600; margin-bottom: 4px;">
        ${certificadoLiberado ? 'Certificado liberado! Você atingiu 80% ou mais de aproveitamento.' : 'Certificado não liberado. É preciso atingir pelo menos 80% de aproveitamento.'}
      </p>
      ${certificadoLiberado ? `<button class="btn-action" type="button" onclick="abrirCertificadoSimulado(${percentual})" style="margin-top: 8px;">Ver Certificado</button>` : ''}
    </div>

    <div style="margin-top: 20px; display: flex; gap: 10px;">
      <button class="btn-action btn-outline" type="button" onclick="navigatePanel('revisao')">Ver Questões para Revisar</button>
      <button class="btn-action" type="button" onclick="navigatePanel('questoes')" style="background: #c0ff00; color: #000; font-weight: 600;">Tentar Novamente</button>
    </div>
  `;
}

function abrirCertificadoSimulado(percentual) {
  const currentUser = getCurrentUser();
  openCertModal({
    recipient: currentUser ? currentUser.name : 'Aluno',
    course: 'Python — Fundamentos',
    grade: `${percentual} / 100`
  });
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
