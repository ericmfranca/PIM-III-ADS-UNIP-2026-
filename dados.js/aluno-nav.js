let currentPanel = 'painel';

function navigatePanel(panel) {
  currentPanel = panel;
  
  // Update sidebar active state
  document.querySelectorAll('.sidebar-nav button').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-nav') === panel) {
      btn.classList.add('active');
    }
  });

  // Update page title if needed
  const titles = {
    painel: 'Painel do aluno',
    avaliacoes: 'Avaliações',
    questoes: 'Questões',
    revisao: 'Revisão',
    desempenho: 'Desempenho',
    conquistas: 'Conquistas',
    certificados: 'Certificados',
    ranking: 'Ranking',
    plano: 'Plano de Estudo',
    perfil: 'Perfil',
    recomendacoes: 'Recomendações',
    notificacoes: 'Notificações'
  };

  const pageTitle = document.querySelector('.page-overline');
  const pageHeading = document.querySelector('.page-heading h1');
  if (pageTitle) pageTitle.textContent = 'Painel do aluno';
  if (pageHeading) pageHeading.innerHTML = `Olá, <span id="greetingName">${getGreetingName()}</span>! ${getTitleSubtitle(panel)}`;

  // Render the appropriate panel
  const renderers = {
    painel: renderPainelPage,
    avaliacoes: renderAvaliacoesPage,
    questoes: renderQuestoesPage,
    revisao: renderRevisaoPage,
    desempenho: renderDesempenhoPage,
    conquistas: renderConquistasPage,
    certificados: renderCertificadosPage,
    ranking: renderRankingPage,
    plano: renderPlanoPage,
    perfil: renderPerfilPage,
    recomendacoes: renderRecomendacoesPage,
    notificacoes: renderNotificacoesPage
  };

const mainContent = document.querySelector('.main-container') || document.querySelector('main');
   if (mainContent && renderers[panel]) {
     renderers[panel](mainContent);
   }
}

function getGreetingName() {
  const el = document.getElementById('greetingName');
  return el ? el.textContent : 'Aluno';
}

function getTitleSubtitle(panel) {
  const subtitles = {
    painel: 'Continue sua jornada',
    avaliacoes: 'Acompanhe suas avaliações',
    questoes: 'Resolva questões de prática',
    revisao: 'Revise o que aprendeu',
    desempenho: 'Veja seu progresso',
    conquistas: 'Suas medalhas e recompensas',
    certificados: 'Seus certificados',
    ranking: 'Competição com amigos',
    plano: 'Organize seu estudo',
    perfil: 'Gerencie seus dados',
    recomendacoes: 'Sugestões personalizadas',
    notificacoes: 'Suas notificações'
  };
  return subtitles[panel] || 'Painel do aluno';
}

function renderPainelPage(container) {
  container.innerHTML = `
    <section id="aluno-painel" class="app-page page-section active-page">
      <article class="card-section">
        <div class="card-header-flex">
          <div>
            <p class="eyebrow">Resumo rápido</p>
            <h2>Continue sua jornada de aprendizado</h2>
          </div>
          <span class="status-tag active">Atualizado</span>
        </div>

        <p class="card-subtitle">Acompanhe seu progresso, XP e recomendações em um só lugar.</p>

        <div id="xpCard" class="xp-card">
          <div class="xp-heading-row">
            <div id="levelTitle" class="level-badge">⭐ Estudioso</div>
            <div id="levelNumber" class="level-number">Nível 3</div>
          </div>

          <div class="xp-bar-container">
            <div id="xpBar" class="progress-bar-fill" style="width:74%"></div>
          </div>

          <div class="xp-values">
            <span id="currentXpDisplay">1850 XP</span>
            <span id="targetXpDisplay">2500 XP</span>
          </div>

          <p class="streak-text"><strong>7 Dias Seguidos 🔥</strong></p>
        </div>
      </article>

      <section class="grid-resumo">
        <article class="card-section">
          <p class="eyebrow">Seu Desempenho</p>
          <h3>Matemática</h3>
          <p class="card-subtitle">100% completo • 82% de acertos</p>
          <div class="progress-bar"><div class="progress-fill" style="width:82%; background:#c0ff00;"></div></div>
        </article>

        <article class="card-section">
          <p class="eyebrow">Última Atividade</p>
          <h3>Simulado PIM III</h3>
          <p class="card-subtitle">Banco de Dados & Engenharia</p>
          <p style="margin-top: 8px; color: #94a3b8; font-size: 0.9rem;">Disponível</p>
        </article>

        <article class="card-section">
          <p class="eyebrow">Conquistas</p>
          <h3>4 de 8 Desbloqueadas</h3>
          <p class="card-subtitle">🎯 🔥 💻 🏆</p>
        </article>
      </section>
    </section>
  `;
}

function renderAvaliacoesPage(container) {
  container.innerHTML = `
    <section class="app-page page-section">
      <article class="card-section">
        <p class="eyebrow">Suas Avaliações</p>
        <h2>Acompanhe seu desempenho</h2>

        <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 12px;">
          <div class="pill-item" style="justify-content: space-between; background: rgba(192, 255, 0, 0.08); border: 1px solid rgba(192, 255, 0, 0.2); padding: 16px; border-radius: 10px;">
            <div>
              <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: 0.35rem; color: #e2e8f0;">Simulado PIM III</h4>
              <p class="card-subtitle">Banco de Dados & Engenharia</p>
            </div>
            <span class="status-tag active" style="background: rgba(192, 255, 0, 0.2); color: #c0ff00;">Disponível</span>
          </div>

          <div class="pill-item" style="justify-content: space-between; background: rgba(255, 193, 7, 0.08); border: 1px solid rgba(255, 193, 7, 0.2); padding: 16px; border-radius: 10px;">
            <div>
              <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: 0.35rem; color: #e2e8f0;">Estruturas de Dados</h4>
              <p class="card-subtitle">Linguagem C e Vetores</p>
            </div>
            <span class="status-tag" style="background: rgba(255, 193, 7, 0.2); color: #ffc107;">Revisar</span>
          </div>

          <div class="pill-item" style="justify-content: space-between; background: rgba(156, 163, 175, 0.08); border: 1px solid rgba(156, 163, 175, 0.2); padding: 16px; border-radius: 10px;">
            <div>
              <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: 0.35rem; color: #e2e8f0;">Programação Orientada a Objetos</h4>
              <p class="card-subtitle">Fundamentos em Java</p>
            </div>
            <span class="status-tag" style="background: rgba(156, 163, 175, 0.2); color: #9ca3af;">Pendente</span>
          </div>
        </div>
      </article>
    </section>
  `;
}

function renderQuestoesPage(container) {
  container.innerHTML = `
    <section class="app-page page-section">
      <article class="card-section">
        <p class="eyebrow">Banco de Questões</p>
        <h2>Pratique com questões selecionadas</h2>

        <div id="questionCard" style="margin-top: 24px; padding: 20px; background: rgba(18, 20, 28, 0.5); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 12px;">
          <h3 style="color: #e2e8f0; margin-bottom: 16px; font-size: 1.1rem;">Em Python, qual palavra-chave é usada para definir uma função?</h3>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: #cbd5e1;">
              <input type="radio" name="resposta" value="def"> def
            </label>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: #cbd5e1;">
              <input type="radio" name="resposta" value="fun"> fun
            </label>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: #cbd5e1;">
              <input type="radio" name="resposta" value="function"> function
            </label>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: #cbd5e1;">
              <input type="radio" name="resposta" value="void"> void
            </label>
          </div>
          <p style="margin-top: 16px; color: #94a3b8; font-size: 0.9rem;">Questão 1 de 3</p>
        </div>

        <div style="margin-top: 20px; display: flex; gap: 10px;">
          <button id="btnPrev" class="btn-action btn-outline" type="button" onclick="quizPrev()" disabled>Anterior</button>
          <button id="btnNext" class="btn-action" type="button" onclick="quizNext()" style="background: #c0ff00; color: #000; font-weight: 600;">Próxima</button>
        </div>
      </article>
    </section>
  `;
}

function renderRevisaoPage(container) {
  container.innerHTML = `
    <section class="app-page page-section">
      <article class="card-section">
        <p class="eyebrow">Revisão de Conteúdo</p>
        <h2>Reforce o que você aprendeu</h2>

        <div style="margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div style="padding: 20px; background: rgba(192, 255, 0, 0.08); border: 1px solid rgba(192, 255, 0, 0.2); border-radius: 12px;">
            <p style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 8px;">Biologia</p>
            <h3 style="color: #c0ff00; font-size: 1.5rem; font-weight: 700;">145</h3>
            <p style="color: #cbd5e1; font-size: 0.9rem;">Questões disponíveis</p>
          </div>

          <div style="padding: 20px; background: rgba(99, 102, 241, 0.08); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 12px;">
            <p style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 8px;">Matemática</p>
            <h3 style="color: #818cf8; font-size: 1.5rem; font-weight: 700;">89</h3>
            <p style="color: #cbd5e1; font-size: 0.9rem;">Questões para revisar</p>
          </div>

          <div style="padding: 20px; background: rgba(168, 85, 247, 0.08); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 12px;">
            <p style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 8px;">Química</p>
            <h3 style="color: #d8b4fe; font-size: 1.5rem; font-weight: 700;">56</h3>
            <p style="color: #cbd5e1; font-size: 0.9rem;">Questões marcadas</p>
          </div>

          <div style="padding: 20px; background: rgba(34, 197, 94, 0.08); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 12px;">
            <p style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 8px;">Física</p>
            <h3 style="color: #86efac; font-size: 1.5rem; font-weight: 700;">72</h3>
            <p style="color: #cbd5e1; font-size: 0.9rem;">Questões concluídas</p>
          </div>
        </div>
      </article>
    </section>
  `;
}

function renderDesempenhoPage(container) {
  container.innerHTML = `
    <section class="app-page page-section">
      <article class="card-section">
        <p class="eyebrow">Análise de Desempenho</p>
        <h2>Seu progresso ao longo do tempo</h2>

        <div style="margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
          <div style="padding: 20px; background: rgba(18, 20, 28, 0.5); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 12px; text-align: center;">
            <p style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 8px;">Taxa de Acerto</p>
            <h3 style="color: #c0ff00; font-size: 2rem; font-weight: 700;">82%</h3>
          </div>

          <div style="padding: 20px; background: rgba(18, 20, 28, 0.5); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 12px; text-align: center;">
            <p style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 8px;">Questões Resolvidas</p>
            <h3 style="color: #818cf8; font-size: 2rem; font-weight: 700;">145</h3>
          </div>

          <div style="padding: 20px; background: rgba(18, 20, 28, 0.5); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 12px; text-align: center;">
            <p style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 8px;">Streak Atual</p>
            <h3 style="color: #fbbf24; font-size: 2rem; font-weight: 700;">7 dias</h3>
          </div>
        </div>
      </article>
    </section>
  `;
}

function renderConquistasPage(container) {
  container.innerHTML = `
    <section class="app-page page-section">
      <article class="card-section">
        <p class="eyebrow">Suas Conquistas</p>
        <h2>4 de 8 medalhas desbloqueadas</h2>

        <div style="margin-top: 24px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
          <div style="padding: 20px; background: rgba(192, 255, 0, 0.08); border: 1px solid rgba(192, 255, 0, 0.2); border-radius: 12px; text-align: center;">
            <div style="font-size: 2.5rem; margin-bottom: 8px;">🎯</div>
            <p style="color: #c0ff00; font-weight: 600; font-size: 0.9rem;">Explorador de Matemática</p>
          </div>

          <div style="padding: 20px; background: rgba(99, 102, 241, 0.08); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 12px; text-align: center;">
            <div style="font-size: 2.5rem; margin-bottom: 8px;">💻</div>
            <p style="color: #818cf8; font-weight: 600; font-size: 0.9rem;">Explorador de C#</p>
          </div>

          <div style="padding: 20px; background: rgba(148, 163, 184, 0.08); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 12px; text-align: center; opacity: 0.5;">
            <div style="font-size: 2.5rem; margin-bottom: 8px;">💾</div>
            <p style="color: #94a3b8; font-weight: 600; font-size: 0.9rem;">🔒 SQL</p>
          </div>

          <div style="padding: 20px; background: rgba(244, 63, 94, 0.08); border: 1px solid rgba(244, 63, 94, 0.2); border-radius: 12px; text-align: center;">
            <div style="font-size: 2.5rem; margin-bottom: 8px;">🔥</div>
            <p style="color: #f43f5e; font-weight: 600; font-size: 0.9rem;">Inabalável</p>
          </div>
        </div>
      </article>
    </section>
  `;
}

function renderCertificadosPage(container) {
  container.innerHTML = `
    <section class="app-page page-section">
      <article class="card-section">
        <p class="eyebrow">Seus Certificados</p>
        <h2>Certificações conquistadas</h2>

        <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 12px;">
          <div style="padding: 20px; background: rgba(192, 255, 0, 0.08); border: 1px solid rgba(192, 255, 0, 0.2); border-radius: 12px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
            <h4 style="color: #e2e8f0; font-weight: 600; margin-bottom: 4px;">C# Avançado</h4>
            <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 8px;">Concluído em 05/06/2026 • Nota: 9.2/10</p>
            <button class="btn-action btn-outline" type="button" style="padding: 6px 12px; font-size: 0.9rem;" onclick="openCertModal()">Baixar PDF</button>
          </div>

          <div style="padding: 20px; background: rgba(99, 102, 241, 0.08); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 12px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
            <h4 style="color: #e2e8f0; font-weight: 600; margin-bottom: 4px;">Python para Ciência de Dados</h4>
            <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 8px;">Concluído em 28/05/2026 • Nota: 8.7/10</p>
            <button class="btn-action btn-outline" type="button" style="padding: 6px 12px; font-size: 0.9rem;" onclick="openCertModal()">Baixar PDF</button>
          </div>
        </div>
      </article>
    </section>
  `;
}

function renderRankingPage(container) {
  container.innerHTML = `
    <section class="app-page page-section">
      <article class="card-section">
        <p class="eyebrow">Ranking Global</p>
        <h2>Compita com outros alunos</h2>

        <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 8px;">
          <div style="padding: 12px 16px; background: rgba(192, 255, 0, 0.08); border: 1px solid rgba(192, 255, 0, 0.2); border-radius: 10px; display: flex; align-items: center; gap: 12px;">
            <span style="font-weight: 700; color: #c0ff00; font-size: 1.1rem;">1º</span>
            <span style="color: #e2e8f0; font-weight: 500;">Você - Daniel Aulicino</span>
            <span style="margin-left: auto; color: #c0ff00; font-weight: 600;">5.240 XP</span>
          </div>

          <div style="padding: 12px 16px; background: rgba(18, 20, 28, 0.5); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 10px; display: flex; align-items: center; gap: 12px;">
            <span style="font-weight: 700; color: #94a3b8; font-size: 1.1rem;">2º</span>
            <span style="color: #cbd5e1;">Maria Silva</span>
            <span style="margin-left: auto; color: #94a3b8;">4.890 XP</span>
          </div>

          <div style="padding: 12px 16px; background: rgba(18, 20, 28, 0.5); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 10px; display: flex; align-items: center; gap: 12px;">
            <span style="font-weight: 700; color: #94a3b8; font-size: 1.1rem;">3º</span>
            <span style="color: #cbd5e1;">João Santos</span>
            <span style="margin-left: auto; color: #94a3b8;">4.670 XP</span>
          </div>

          <div style="padding: 12px 16px; background: rgba(18, 20, 28, 0.5); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 10px; display: flex; align-items: center; gap: 12px;">
            <span style="font-weight: 700; color: #94a3b8; font-size: 1.1rem;">4º</span>
            <span style="color: #cbd5e1;">Ana Costa</span>
            <span style="margin-left: auto; color: #94a3b8;">4.210 XP</span>
          </div>
        </div>
      </article>
    </section>
  `;
}

function renderPlanoPage(container) {
  container.innerHTML = `
    <section class="app-page page-section">
      <article class="card-section">
        <p class="eyebrow">Seu Plano de Estudo</p>
        <h2>Organize sua jornada de aprendizado</h2>

        <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 12px;">
          <div style="padding: 16px; background: rgba(192, 255, 0, 0.08); border: 1px solid rgba(192, 255, 0, 0.2); border-radius: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <h4 style="color: #e2e8f0; font-weight: 600;">Matemática Avançada</h4>
              <span style="color: #c0ff00; font-weight: 600;">75% completo</span>
            </div>
            <div style="height: 6px; background: rgba(0, 0, 0, 0.3); border-radius: 999px; overflow: hidden;">
              <div style="height: 100%; width: 75%; background: #c0ff00; border-radius: 999px;"></div>
            </div>
          </div>

          <div style="padding: 16px; background: rgba(99, 102, 241, 0.08); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <h4 style="color: #e2e8f0; font-weight: 600;">Programação Python</h4>
              <span style="color: #818cf8; font-weight: 600;">45% completo</span>
            </div>
            <div style="height: 6px; background: rgba(0, 0, 0, 0.3); border-radius: 999px; overflow: hidden;">
              <div style="height: 100%; width: 45%; background: #818cf8; border-radius: 999px;"></div>
            </div>
          </div>

          <div style="padding: 16px; background: rgba(148, 163, 184, 0.08); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <h4 style="color: #e2e8f0; font-weight: 600;">Inglês para Negócios</h4>
              <span style="color: #94a3b8; font-weight: 600;">20% completo</span>
            </div>
            <div style="height: 6px; background: rgba(0, 0, 0, 0.3); border-radius: 999px; overflow: hidden;">
              <div style="height: 100%; width: 20%; background: #94a3b8; border-radius: 999px;"></div>
            </div>
          </div>
        </div>
      </article>
    </section>
  `;
}

function renderPerfilPage(container) {
  const currentUser = getCurrentUser();
  container.innerHTML = `
    <section class="app-page page-section">
      <article class="card-section">
        <p class="eyebrow">Seu Perfil</p>
        <h2>Gerencie suas informações</h2>

        <div style="margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div>
            <label style="display: block; color: #94a3b8; font-size: 0.85rem; margin-bottom: 6px; font-weight: 500;">Nome Completo</label>
            <input type="text" value="${currentUser?.name || 'Lucas Silva'}" readonly style="background: rgba(18, 20, 28, 0.5); border: 1px solid rgba(148, 163, 184, 0.2); color: #e2e8f0; padding: 10px 12px; border-radius: 8px; width: 100%;">
          </div>

          <div>
            <label style="display: block; color: #94a3b8; font-size: 0.85rem; margin-bottom: 6px; font-weight: 500;">Email</label>
            <input type="email" value="${currentUser?.email || 'aluno@nemcolei.com'}" readonly style="background: rgba(18, 20, 28, 0.5); border: 1px solid rgba(148, 163, 184, 0.2); color: #e2e8f0; padding: 10px 12px; border-radius: 8px; width: 100%;">
          </div>

          <div style="grid-column: 1 / -1;">
            <label style="display: block; color: #94a3b8; font-size: 0.85rem; margin-bottom: 6px; font-weight: 500;">Nível</label>
            <input type="text" value="3 - Estudioso" readonly style="background: rgba(18, 20, 28, 0.5); border: 1px solid rgba(148, 163, 184, 0.2); color: #e2e8f0; padding: 10px 12px; border-radius: 8px; width: 100%;">
          </div>
        </div>
      </article>
    </section>
  `;
}

function renderRecomendacoesPage(container) {
  container.innerHTML = `
    <section class="app-page page-section">
      <article class="card-section">
        <p class="eyebrow">Recomendações Personalizadas</p>
        <h2>Baseado no seu progresso</h2>

        <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 12px;">
          <div style="padding: 16px; background: rgba(192, 255, 0, 0.08); border: 1px solid rgba(192, 255, 0, 0.2); border-radius: 10px;">
            <h4 style="color: #e2e8f0; font-weight: 600; margin-bottom: 4px;">⭐ Reforce Álgebra Linear</h4>
            <p style="color: #94a3b8; font-size: 0.9rem;">Você tem tido dificuldade neste tópico. Recomendamos 5 horas de prática.</p>
          </div>

          <div style="padding: 16px; background: rgba(99, 102, 241, 0.08); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 10px;">
            <h4 style="color: #e2e8f0; font-weight: 600; margin-bottom: 4px;">📚 Novo Conteúdo: Programação Orientada a Objetos</h4>
            <p style="color: #94a3b8; font-size: 0.9rem;">Baseado nos seus interesses e progresso atual.</p>
          </div>

          <div style="padding: 16px; background: rgba(34, 197, 94, 0.08); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 10px;">
            <h4 style="color: #e2e8f0; font-weight: 600; margin-bottom: 4px;">🎯 Simulado Personalizado</h4>
            <p style="color: #94a3b8; font-size: 0.9rem;">Teste seus conhecimentos com questões do seu nível.</p>
          </div>
        </div>
      </article>
    </section>
  `;
}

function renderNotificacoesPage(container) {
  container.innerHTML = `
    <section class="app-page page-section">
      <article class="card-section">
        <p class="eyebrow">Suas Notificações</p>
        <h2>Fique atualizado</h2>

        <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 12px;">
          <div style="padding: 12px 16px; background: rgba(192, 255, 0, 0.08); border-left: 3px solid #c0ff00; border-radius: 4px;">
            <p style="color: #e2e8f0; font-weight: 500; margin-bottom: 2px;">🎉 Parabéns! Você atingiu o nível 3!</p>
            <p style="color: #94a3b8; font-size: 0.85rem;">Há 2 horas</p>
          </div>

          <div style="padding: 12px 16px; background: rgba(99, 102, 241, 0.08); border-left: 3px solid #818cf8; border-radius: 4px;">
            <p style="color: #e2e8f0; font-weight: 500; margin-bottom: 2px;">📖 Novo conteúdo disponível em Biologia</p>
            <p style="color: #94a3b8; font-size: 0.85rem;">Há 5 horas</p>
          </div>

          <div style="padding: 12px 16px; background: rgba(244, 63, 94, 0.08); border-left: 3px solid #f43f5e; border-radius: 4px;">
            <p style="color: #e2e8f0; font-weight: 500; margin-bottom: 2px;">⏰ Lembrete: Complete seu simulado de hoje!</p>
            <p style="color: #94a3b8; font-size: 0.85rem;">Há 1 dia</p>
          </div>
        </div>
      </article>
    </section>
  `;
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('nemcolei_current_user') || 'null');
  } catch (error) {
    return null;
  }
}
