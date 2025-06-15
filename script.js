const API = 'https://deumatch-qryw.onrender.com';

async function carregarUsuarios() {
  const res = await fetch(`${API}/users/list`);
  const lista = await res.json();
  const div = document.getElementById('usuarios');
  div.innerHTML = '';

  lista.forEach(user => {
    const card = document.createElement('div');
    card.className = 'usuario-card';
    card.innerHTML = `
      <p><strong>Nome:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Status:</strong> ${user.status}</p>
      <button class="suspender" onclick="suspender('${user.email}')">Suspender</button>
      <button class="excluir" onclick="excluir('${user.email}')">Excluir</button>
    `;
    div.appendChild(card);
  });
}

async function suspender(email) {
  await fetch(`${API}/users/suspend?email=${email}`, { method: 'PUT' });
  carregarUsuarios();
}

async function excluir(email) {
  await fetch(`${API}/users/delete?email=${email}`, { method: 'DELETE' });
  carregarUsuarios();
}

carregarUsuarios();
