const appState = {
    user: {
        name: "Maria Eduarda",
        course: "Análise e Desenvolvimento de Sistemas"
    },
    xp: {
        current: 1850,
        target: 2500,
        currentLevel: 3,
        levelTitle: "Estudioso",
        nextLevelTitle: "Dedicado"
    },
    discipline: {
        name: "Matemática",
        completion: 100,
        questions: 145,
        accuracy: 82
    },
    conquests: {
        total: 8,
        list: [
            { id: "math_exp", name: "Explorador de Matemática", unlocked: true, icon: "🎯" },
            { id: "cs_exp", name: "Explorador de C#", unlocked: true, icon: "💻" },
            { id: "sql_exp", name: "Explorador de SQL", unlocked: false, icon: "💾" },
            { id: "unstoppable", name: "Inabalável", unlocked: true, icon: "🔥" }
        ]
    },
    assessments: [
        { title: "Simulado PIM III", sub: "Banco de Dados & Engenharia", tag: "Disponível" },
        { title: "Estruturas de Dados", sub: "Linguagem C e Vetores", tag: "Revisar" },
        { title: "Programação Orientada a Objetos", sub: "Fundamentos em Java", tag: "Pendente" }
    ]
};

const Navigation = {
    init() {
        const navButtons = document.querySelectorAll('.nav-item');
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const currentButton = e.currentTarget;
                const targetPageId = currentButton.getAttribute('data-target');
                const titleText = currentButton.getAttribute('data-title');
                
                this.switchTab(targetPageId, titleText, currentButton);
            });
        });
    },

    switchTab(pageId, titleText, clickTarget) {
        const pages = document.querySelectorAll('.app-page');
        pages.forEach(p => p.classList.remove('active-page'));
        
        const activePage = document.getElementById(pageId);
        if(activePage) activePage.classList.add('active-page');
        
        const header = document.getElementById('headerTitle');
        if (header) header.innerText = titleText;
        
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active-nav'));
        if (clickTarget) clickTarget.classList.add('active-nav');
        
        const main = document.getElementById('mainContent');
        if (main) main.scrollTop = 0;
    }
};
const ModalContainer = {
    create(title, bodyText) {
        if (document.getElementById('dynamicModal')) return;

        const overlay = document.createElement('div');
        overlay.id = 'dynamicModal';
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background-color: var(--color-modal-overlay); z-index: 200;
            display: flex; align-items: center; justify-content: center;
            opacity: 0; transition: opacity 0.3s ease; padding: 20px;
        `;

        overlay.innerHTML = `
            <div class="card-section" style="border: 2px solid var(--color-accent); width: 100%; max-width: 400px; text-align: center; transform: scale(0.8); transition: transform 0.3s ease; box-shadow: 0 0 30px rgba(192, 255, 0, 0.2);">
                <div style="font-size: 3rem; margin-bottom: 15px;">🏆</div>
                <h2 style="margin-bottom: 10px;">${title}</h2>
                <p class="card-subtitle" style="font-size:0.95rem; margin-bottom:15px;">${bodyText}</p>
                <button class="btn-action" id="btnCloseModal" style="background-color: var(--color-surface-light); color: var(--color-text-primary); box-shadow:none;">Fechar</button>
            </div>
        `;

        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.style.opacity = '1';
            overlay.querySelector('.card-section').style.transform = 'scale(1)';
        }, 50);

        overlay.querySelector('#btnCloseModal').addEventListener('click', () => this.destroy());
    },

    destroy() {
        const overlay = document.getElementById('dynamicModal');
        if (!overlay) return;

        overlay.style.opacity = '0';
        overlay.querySelector('.card-section').style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
};
const Dashboard = {
    renderXp(xpState) {
        const current = document.getElementById('currentXpDisplay');
        const target = document.getElementById('targetXpDisplay');
        const levelTitle = document.getElementById('levelTitle');
        const levelNumber = document.getElementById('levelNumber');
        const xpBar = document.getElementById('xpBar');
        if (current) current.innerText = `${xpState.current.toLocaleString()} XP`;
        if (target) target.innerText = `${xpState.target.toLocaleString()} XP`;
        if (levelTitle) levelTitle.innerText = `⭐ ${xpState.levelTitle}`;
        if (levelNumber) levelNumber.innerText = `Nível ${xpState.currentLevel}`;

        const percentage = Math.min(100, Math.round((xpState.current / xpState.target) * 100));
        if (xpBar) xpBar.style.width = `${percentage}%`;
    },

    renderPerformanceChart(discipline) {
        const percentageText = document.getElementById('percentageText');
        const chartCenterData = document.getElementById('chartCenterData');
        const performanceTitle = document.querySelector('#performance-page .card-title');
        if (percentageText) percentageText.innerText = `${discipline.completion}%`;
        if (chartCenterData) chartCenterData.innerText = `${discipline.accuracy}%`;
        if (performanceTitle) performanceTitle.innerText = discipline.name;
        const pieChart = document.getElementById('pieChart');
        if(pieChart) {
            const fillValue = Math.min(Math.max(discipline.accuracy, 0), 100);
            pieChart.style.background = `conic-gradient(var(--color-accent) ${fillValue}%, var(--color-surface-light) 0%)`;
        }
    },

    renderAssessmentsList(list) {
        const container = document.getElementById('avaliacoesList');
        if(!container) return;
        
        container.innerHTML = list.map(item => `
            <article class="pill-item" style="justify-content: space-between;">
                <div>
                    <h4 style="font-size: 1rem; font-weight:600; margin-bottom: 0.35rem;">${item.title}</h4>
                    <p class="card-subtitle">${item.sub}</p>
                </div>
                <span class="status-tag">${item.tag}</span>
            </article>
        `).join('');
    },

    renderConquests(conquests) {
        const unlockedCount = conquests.list.filter(c => c.unlocked).length;
        const conquestCount = document.getElementById('conquestCount');
        if (conquestCount) conquestCount.innerText = `${unlockedCount} de ${conquests.total} desbloqueadas`;
        const container = document.getElementById('conquestsList');
        if(!container) return;

        container.innerHTML = conquests.list.map(c => `
            <article class="pill-item ${c.unlocked ? '' : 'locked'}">
                <div class="rec-icon-glow" style="background:${c.unlocked ? 'rgba(192,255,0,0.18)' : 'rgba(255,255,255,0.06)'}; box-shadow: ${c.unlocked ? '0 0 25px rgba(192,255,0,0.2)' : 'none'};">
                    ${c.icon}
                </div>
                <span style="font-weight:500; font-size:0.95rem;">${c.name}</span>
                ${c.unlocked ? '' : '<span style="margin-left:auto;">🔒</span>'}
            </article>
        `).join('');
    }
};
const Profile = {
    render(userState) {
        const nameEl = document.getElementById('profileName');
        const courseEl = document.getElementById('profileCourse');
        if(nameEl) nameEl.innerText = userState.name;
        if(courseEl) courseEl.innerText = userState.course;
    }
};

// Orchestrator
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();

    const data = appState;

    Dashboard.renderXp(data.xp);
    Dashboard.renderPerformanceChart(data.discipline);
    Dashboard.renderAssessmentsList(data.assessments);
    Dashboard.renderConquests(data.conquests);
    Profile.render(data.user);

    const btnPraticar = document.getElementById('btnPraticar');
    if (btnPraticar) btnPraticar.addEventListener('click', () => {
        data.xp.current += 150;
        if (data.xp.current > data.xp.target) data.xp.current = data.xp.target;
        Dashboard.renderXp(data.xp);
    });

    const btnCert = document.getElementById('btnCertificado');
    if (btnCert) btnCert.addEventListener('click', () => {
        ModalContainer.create(
            "Certificado de Excelência", 
            `Concedido a ${data.user.name} por atingir a marca de 100% de conclusão na trilha de Matemática.`
        );
    });
});
const appState = {
    user: {
        name: "Maria Eduarda",
        course: "Análise e Desenvolvimento de Sistemas"
    },
    xp: {
        current: 1850,
        target: 2500,
        currentLevel: 3,
        levelTitle: "Estudioso",
        nextLevelTitle: "Dedicado"
    },
    discipline: {
        name: "Matemática",
        completion: 100,
        questions: 145,
        accuracy: 82
    },
    conquests: {
        total: 8,
        list: [
            { id: "math_exp", name: "Explorador de Matemática", unlocked: true, icon: "🎯" },
            { id: "cs_exp", name: "Explorador de C#", unlocked: true, icon: "💻" },
            { id: "sql_exp", name: "Explorador de SQL", unlocked: false, icon: "💾" },
            { id: "unstoppable", name: "Inabalável", unlocked: true, icon: "🔥" }
        ]
    },
    assessments: [
        { title: "Simulado PIM III", sub: "Banco de Dados & Engenharia", tag: "Disponível" },
        { title: "Estruturas de Dados", sub: "Linguagem C e Vetores", tag: "Revisar" },
        { title: "Programação Orientada a Objetos", sub: "Fundamentos em Java", tag: "Pendente" }
    ]
};

const Navigation = {
    init() {
        const navButtons = document.querySelectorAll('.nav-item');
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const currentButton = e.currentTarget;
                const targetPageId = currentButton.getAttribute('data-target');
                const titleText = currentButton.getAttribute('data-title');
                
                this.switchTab(targetPageId, titleText, currentButton);
            });
        });
    },

    switchTab(pageId, titleText, clickTarget) {
        const pages = document.querySelectorAll('.app-page');
        pages.forEach(p => p.classList.remove('active-page'));
        
        const activePage = document.getElementById(pageId);
        if(activePage) activePage.classList.add('active-page');
        
        const headerTitle = document.getElementById('headerTitle') || document.getElementById('headerTitle');
        if(headerTitle) headerTitle.innerText = titleText;
        
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active-nav'));
        if (clickTarget) clickTarget.classList.add('active-nav');
        
        const mainContent = document.getElementById('mainContent') || document.querySelector('.main-container');
        if (mainContent) mainContent.scrollTop = 0;
    }
};
const ModalContainer = {
    create(title, bodyText) {
        if (document.getElementById('dynamicModal')) return;

        const overlay = document.createElement('div');
        overlay.id = 'dynamicModal';
        overlay.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: var(--color-modal-overlay); z-index: 200; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; padding: 20px;`;

        overlay.innerHTML = `
            <div class="card-section" style="border: 2px solid var(--color-accent); width: 100%; max-width: 400px; text-align: center; transform: scale(0.8); transition: transform 0.3s ease; box-shadow: 0 0 30px rgba(192, 255, 0, 0.2);">
                <div style="font-size: 3rem; margin-bottom: 15px;">🏆</div>
                <h2 style="margin-bottom: 10px;">${title}</h2>
                <p class="card-subtitle" style="font-size:0.95rem; margin-bottom:15px;">${bodyText}</p>
                <button class="btn-action" id="btnCloseModal" style="background-color: var(--color-surface-light); color: var(--color-text-primary); box-shadow:none;">Fechar</button>
            </div>
        `;

        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.style.opacity = '1';
            overlay.querySelector('.card-section').style.transform = 'scale(1)';
        }, 50);

        overlay.querySelector('#btnCloseModal').addEventListener('click', () => this.destroy());
    },

    destroy() {
        const overlay = document.getElementById('dynamicModal');
        if (!overlay) return;

        overlay.style.opacity = '0';
        overlay.querySelector('.card-section').style.transform = 'scale(0.8)';
        setTimeout(() => { overlay.remove(); }, 300);
    }
};
const Dashboard = {
    renderXp(xpState) {
        const current = document.getElementById('currentXpDisplay');
        const target = document.getElementById('targetXpDisplay');
        const levelTitle = document.getElementById('levelTitle');
        const levelNumber = document.getElementById('levelNumber');
        const xpBar = document.getElementById('xpBar');
        if (current) current.innerText = `${xpState.current.toLocaleString()} XP`;
        if (target) target.innerText = `${xpState.target.toLocaleString()} XP`;
        if (levelTitle) levelTitle.innerText = `⭐ ${xpState.levelTitle}`;
        if (levelNumber) levelNumber.innerText = `Nível ${xpState.currentLevel}`;

        if (xpBar) {
            const percentage = Math.min(100, Math.round((xpState.current / xpState.target) * 100));
            xpBar.style.width = `${percentage}%`;
        }
    },

    renderPerformanceChart(discipline) {
        const percentageText = document.getElementById('percentageText');
        const chartCenter = document.getElementById('chartCenterData');
        const pieChart = document.getElementById('pieChart');
        if (percentageText) percentageText.innerText = `${discipline.completion}%`;
        if (chartCenter) chartCenter.innerText = `${discipline.accuracy}%`;
        if (pieChart) {
            const fillValue = Math.min(Math.max(discipline.accuracy, 0), 100);
            pieChart.style.background = `conic-gradient(var(--color-accent) ${fillValue}%, var(--color-surface-light) 0%)`;
        }
    },

    renderAssessmentsList(list) {
        const container = document.getElementById('avaliacoesList');
        if(!container) return;
        container.innerHTML = list.map(item => `
            <article class="pill-item" style="justify-content: space-between;">
                <div>
                    <h4 style="font-size: 1rem; font-weight:600; margin-bottom: 0.35rem;">${item.title}</h4>
                    <p class="card-subtitle">${item.sub}</p>
                </div>
                <span class="status-tag">${item.tag}</span>
            </article>
        `).join('');
    },

    renderConquests(conquests) {
        const unlockedCount = conquests.list.filter(c => c.unlocked).length;
        const container = document.getElementById('conquestsList');
        const count = document.getElementById('conquestCount');
        if (count) count.innerText = `${unlockedCount} de ${conquests.total} desbloqueadas`;
        if(!container) return;

        container.innerHTML = conquests.list.map(c => `
            <article class="pill-item ${c.unlocked ? '' : 'locked'}">
                <div class="rec-icon-glow" style="background:${c.unlocked ? 'rgba(192,255,0,0.18)' : 'rgba(255,255,255,0.06)'}; box-shadow: ${c.unlocked ? '0 0 25px rgba(192,255,0,0.2)' : 'none'};">
                    ${c.icon}
                </div>
                <span style="font-weight:500; font-size:0.95rem;">${c.name}</span>
                ${c.unlocked ? '' : '<span style="margin-left:auto;">🔒</span>'}
            </article>
        `).join('');
    }
};
const Profile = {
    render(userState) {
        const name = document.getElementById('profileName');
        const course = document.getElementById('profileCourse');
        if (name) name.innerText = userState.name;
        if (course) course.innerText = userState.course;
    }
};

window.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation if present
    try { Navigation.init(); } catch(e) { /* ignore */ }

    const data = appState;
    Dashboard.renderXp(data.xp);
    Dashboard.renderPerformanceChart(data.discipline);
    Dashboard.renderAssessmentsList(data.assessments);
    Dashboard.renderConquests(data.conquests);
    Profile.render(data.user);

    const btnPraticar = document.getElementById('btnPraticar');
    if (btnPraticar) btnPraticar.addEventListener('click', () => {
        data.xp.current += 150;
        if (data.xp.current > data.xp.target) data.xp.current = data.xp.target;
        Dashboard.renderXp(data.xp);
    });

    const btnCert = document.getElementById('btnCertificado');
    if (btnCert) btnCert.addEventListener('click', () => {
        ModalContainer.create(
            "Certificado de Excelência",
            `Concedido a ${data.user.name} por atingir a marca de 100% de conclusão na trilha de ${data.discipline.name}.`
        );
    });
});
