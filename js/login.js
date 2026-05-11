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

<<<<<<< HEAD
  
  // Credencial de teste — substituir pela chamada ao back-end Flask

    window.location.href = '/dashboard.html';

=======
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
>>>>>>> 61e14ab1c0264ed12c448892e3317707266dde0e
});