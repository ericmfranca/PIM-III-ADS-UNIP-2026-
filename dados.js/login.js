const USERS_STORAGE_KEY = 'nemcolei_temp_users';
const CURRENT_USER_KEY = 'nemcolei_current_user';

function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  } catch (error) {
    return [];
  }
}

function setCurrentUser(user) {
  try {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.warn('Não foi possível salvar o usuário atual.', error);
  }
}

function login() {
  var username = document.getElementById('login').value.trim();
  var password = document.getElementById('senha').value;
  var users = getStoredUsers();
  var matchedUser = users.find((user) => {
    return (user.email === username.toLowerCase() || user.name.toLowerCase() === username.toLowerCase()) && user.password === password;
  });

  if (matchedUser) {
    setCurrentUser(matchedUser);
    alert('Login realizado com sucesso!');
    location.href = 'home.aluno.html';
    return;
  }

  if (username === 'Administrador' && password === '123') {
    setCurrentUser({ name: 'Administrador', email: 'admin@nemcolei.com' });
    alert('Login realizado com sucesso!');
    location.href = 'home.administrador.html';
  } else if (username === 'Aluno' && password === '1234') {
    setCurrentUser({ name: 'Aluno', email: 'aluno@nemcolei.com' });
    alert('Login realizado com sucesso!');
    location.href = 'home.aluno.html';
  } else if (username === 'Gerenciador de Conteudo' && password === '12345') {
    setCurrentUser({ name: 'Gerenciador de Conteúdo', email: 'gerenciador@nemcolei.com' });
    alert('Login realizado com sucesso!');
    location.href = 'home.gerenciador.html';
  } else {
    alert('Nome de usuário ou senha incorretos.');
  }
}
