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

    window.location.href = '/dashboard.html';

});