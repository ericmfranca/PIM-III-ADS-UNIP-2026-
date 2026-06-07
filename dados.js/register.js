const USERS_STORAGE_KEY = 'nemcolei_temp_users';
const CURRENT_USER_KEY = 'nemcolei_current_user';

function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  } catch (error) {
    return [];
  }
}

function setStoredUsers(users) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.warn('Não foi possível salvar o cadastro localmente.', error);
  }
}

function setCurrentUser(user) {
  try {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.warn('Não foi possível salvar o usuário atual.', error);
  }
}

function showRegisterMessage(message, type = 'error') {
  const messageEl = document.getElementById('registerMessage');
  if (!messageEl) return;
  messageEl.textContent = message;
  messageEl.className = `form-message ${type}`;
}

function registerUser() {
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;

  if (!nome || !email || !senha || !confirmarSenha) {
    showRegisterMessage('Preencha todos os campos.', 'error');
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    showRegisterMessage('Digite um email válido.', 'error');
    return;
  }

  if (senha.length < 4) {
    showRegisterMessage('A senha deve ter no mínimo 4 caracteres.', 'error');
    return;
  }

  if (senha !== confirmarSenha) {
    showRegisterMessage('As senhas não coincidem.', 'error');
    return;
  }

  const users = getStoredUsers();
  const exists = users.some((user) => user.email === email);

  if (exists) {
    showRegisterMessage('Este email já foi cadastrado.', 'error');
    return;
  }

  const newUser = {
    name: nome,
    email,
    password: senha,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  setStoredUsers(users);
  setCurrentUser(newUser);

  showRegisterMessage('Cadastro realizado com sucesso! Redirecionando...', 'success');
  setTimeout(() => {
    location.href = 'home.aluno.html';
  }, 900);
}
