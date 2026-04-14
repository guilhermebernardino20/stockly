function mostrarMsg(texto, sucesso = false) {
  const msg = document.getElementById('msg');
  msg.textContent = texto;
  msg.className = 'msg' + (sucesso ? ' success' : '');
  msg.style.display = 'block';
}

document.getElementById('produtoForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const codigo = document.getElementById('codigo').value.trim();
  const nome = document.getElementById('nomeProduto').value.trim();
  const categoria = document.getElementById('categoria').value.trim();
  const quantidade = document.getElementById('quantidade').value;
  const preco = document.getElementById('preco').value;

  if (!codigo || !nome || !categoria || !quantidade || !preco) {
    mostrarMsg('Preencha todos os campos.');
    return;
  }

  const payload = {
    codigo,
    nome,
    categoria,
    quantidade,
    preco
  };

  console.log('Produto:', payload);

  // FUTURO: integração com Flask
  /*
  fetch('/api/produtos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    mostrarMsg('Produto cadastrado com sucesso!', true);
  });
  */

  mostrarMsg('Produto cadastrado com sucesso!', true);

  document.getElementById('produtoForm').reset();
});