const form = document.getElementById('loginForm');
const msg = document.getElementById('msg');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const pass = document.getElementById('password').value;

  msg.style.display = 'none';
  msg.className = 'msg';

  if (!email || !pass) {
    msg.textContent = 'Preencha todos os campos.';
    msg.style.display = 'block';
    return;
  }

  // Credencial de teste — substituir pela chamada ao back-end Flask
  if (email === 'admin@stockly.com' && pass === 'admin123') {
    msg.textContent = 'Login realizado com sucesso!';
    msg.classList.add('success');
    msg.style.display = 'block';
    // window.location.href = '/dashboard.html';
  } else {
    msg.textContent = 'E-mail ou senha incorretos.';
    msg.style.display = 'block';
  }
});