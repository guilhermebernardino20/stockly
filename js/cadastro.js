// Máscaras de input
function mascararCPF(v) {
  return v.replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function mascararCNPJ(v) {
  return v.replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
}

function mascararTelefone(v) {
  return v.replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
}

document.getElementById('cpf').addEventListener('input', function () {
  this.value = mascararCPF(this.value);
});

document.getElementById('cnpj').addEventListener('input', function () {
  this.value = mascararCNPJ(this.value);
});

document.getElementById('telefone').addEventListener('input', function () {
  this.value = mascararTelefone(this.value);
});

// Validações
function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarCPF(cpf) {
  return cpf.replace(/\D/g, '').length === 11;
}

function mostrarMsg(texto, sucesso = false) {
  const msg = document.getElementById('msg');
  msg.textContent = texto;
  msg.className = 'msg' + (sucesso ? ' success' : '');
  msg.style.display = 'block';
}

// Submit
document.getElementById('cadastroForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome          = document.getElementById('nome').value.trim();
  const cpf           = document.getElementById('cpf').value.trim();
  const email         = document.getElementById('email').value.trim();
  const telefone      = document.getElementById('telefone').value.trim();
  const nomeNegocio   = document.getElementById('nomeNegocio').value.trim();
  const cnpj          = document.getElementById('cnpj').value.trim();
  const senha         = document.getElementById('senha').value;
  const confirmar     = document.getElementById('confirmarSenha').value;

  // Campos obrigatórios
  if (!nome || !cpf || !email || !telefone || !nomeNegocio || !cnpj || !senha || !confirmar) {
    mostrarMsg('Preencha todos os campos.');
    return;
  }

  if (!validarEmail(email)) {
    mostrarMsg('Informe um e-mail válido.');
    return;
  }

  if (!validarCPF(cpf)) {
    mostrarMsg('CPF inválido.');
    return;
  }

  if (senha.length < 8) {
    mostrarMsg('A senha deve ter pelo menos 8 caracteres.');
    return;
  }

  if (senha !== confirmar) {
    mostrarMsg('As senhas não coincidem.');
    return;
  }

  // Payload para envio ao back-end Flask
  const payload = { nome, cpf, email, telefone, nomeNegocio, cnpj, senha };
  console.log('Payload de cadastro:', payload);

  // TODO: substituir pelo fetch real ao endpoint /api/cadastro
  // fetch('/api/cadastro', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })
  //   .then(r => r.json())
  //   .then(data => { ... });

  mostrarMsg('Cadastro realizado com sucesso! Redirecionando...', true);
  setTimeout(() => { window.location.href = 'index.html'; }, 2000);
});