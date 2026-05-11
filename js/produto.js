// ID do microempresário logado — substituir pelo valor real após integração do login
const ID_MICRO = 1;

function mostrarMsg(texto, sucesso = false) {
  const msg = document.getElementById('msg');
  msg.textContent = texto;
  msg.className = 'msg' + (sucesso ? ' success' : '');
  msg.style.display = 'block';
}

document.getElementById('produtoForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const nome       = document.getElementById('nomeProduto').value.trim();
  const categoria  = document.getElementById('categoria').value.trim();
  const quantidade = document.getElementById('quantidade').value;
  const precoCusto = document.getElementById('precoCusto').value;
  const precoVenda = document.getElementById('precoVenda').value;
  const codigo     = document.getElementById('codigo').value.trim();

  if (!nome || !categoria || !quantidade || !precoCusto || !precoVenda) {
    mostrarMsg('Preencha todos os campos obrigatórios.');
    return;
  }

  const payload = {
    id_micro:     ID_MICRO,
    id_categoria: 1, 
    nome:         nome,
    marca:        codigo || null,
    tamanho:      null,
    preco:        parseFloat(precoVenda),
    quantidade:   parseInt(quantidade)
  };

  try {
    const response = await fetch('http://127.0.0.1:5000/api/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok) {
      mostrarMsg('Produto cadastrado com sucesso!', true);
      document.getElementById('produtoForm').reset();
    } else {
      mostrarMsg(data.erro || 'Erro ao cadastrar produto.');
    }
  } catch (err) {
    mostrarMsg('Erro de conexão com o servidor.');
    console.error(err);
  }
});