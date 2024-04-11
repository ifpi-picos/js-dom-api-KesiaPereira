const adicionar = document.getElementById('adicionarTarefa');
const lista = document.getElementById('listaTarefa');
const entrada = document.getElementById('novaTarefa');

// Load tarefas from local storage
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

// Render tarefas
function renderizarTarefas() {
  lista.innerHTML = '';
  tarefas.forEach((tarefa, index) => {
    const li = document.createElement('li');
    li.classList.add('itemTarefa');
    li.innerHTML = `
      <span>${tarefa}</span>
      <button onclick="concluirTarefa(${index})">Concluir</button>
      <button onclick="removerTarefa(${index})">Remover</button>
    `;
    lista.appendChild(li);
  });
}

// Adicionar tarefa
function addTask(tarefa) {
  tarefas.push(tarefa);
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
  renderizarTarefas();
}

//Concluir tarefa
function concluirTarefa(index) {
  tarefas.splice(index, 1);
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
  renderizarTarefas();
}

//Remover tarefa
function removerTarefa(index) {
  tarefas.splice(index, 1);
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
  renderizarTarefas();
}

//EventListener para adicionar uma nova entrada
adicionar.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!entrada.value.trim()) return;
  addTask(entrada.value);
  entrada.value = '';
});

//Renderização inicial
renderizarTarefas();