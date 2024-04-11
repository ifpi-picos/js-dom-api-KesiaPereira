const adicionar = document.getElementById('adicionarTarefa');
const lista = document.getElementById('listaTarefa');
const entradaTarefa = document.getElementById('novaTarefa');
const entradaEtiqueta = document.getElementById('novaEtiqueta');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

adicionar.addEventListener('submit', (e) => {
  e.preventDefault();
  const tarefaTexto = entradaTarefa.value.trim();
  const etiquetaTexto = entradaEtiqueta.value.trim();
  if (!tarefaTexto) return;

  const tarefaData = new Date().toISOString();
  const tarefa = { text: tarefaTexto, date: tarefaData, isCompleted: false, etiqueta: etiquetaTexto };

  const li = document.createElement('li');
  li.textContent = `${tarefaTexto} - ${tarefaData} - ${etiquetaTexto}`;
  lista.appendChild(li);

  tarefas.push(tarefa);
  localStorage.setItem('tarefas', JSON.stringify(tarefas));

  const concluirBotao = document.createElement('button');
  concluirBotao.textContent = 'Concluir';
  concluirBotao.addEventListener('click', () => concluirTarefa(tarefa, li));
  li.appendChild(concluirBotao);

  const removerBotao = document.createElement('button');
  removerBotao.textContent = 'Remover';
  removerBotao.addEventListener('click', () => removerTarefa(li));
  li.appendChild(removerBotao);

  entradaTarefa.value = '';
  entradaEtiqueta.value = '';
});

function concluirTarefa(tarefa, li) {
  tarefa.isCompleted = true;
  li.style.textDecoration = 'line-through';
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function removerTarefa(li) {
  const tarefaTexto = li.textContent.slice(0, -14);
  tarefas = tarefas.filter((tarefa) => tarefa.text !== tarefaTexto);
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
  li.remove();
}

document.addEventListener('DOMContentLoaded', () => {
  tarefas.forEach((tarefa) => {
    const li = document.createElement('li');
    li.textContent = `${tarefa.text} - ${tarefa.date}`;
    if (tarefa.isCompleted) li.style.textDecoration = 'line-through';
    lista.appendChild(li);

    const concluirBotao = document.createElement('button');
    concluirBotao.textContent = 'Concluir';
    concluirBotao.addEventListener('click', () => concluirTarefa(tarefa, li));
    li.appendChild(concluirBotao);

    const removerBotao = document.createElement('button');
    removerBotao.textContent = 'Remover';
    removerBotao.addEventListener('click', () => removerTarefa(li));
    li.appendChild(removerBotao);
  });
});

const { google } = require('googleapis');
const auth = new google.auth.GoogleAuth({
  keyFile: 'path/to/credentials.json',
  scopes: 'https://www.googleapis.com/auth/calendar',
});
const calendar = google.calendar('v3');

async function createEvent() {
  const authClient = await auth.authorize();
  const event = {
    summary: 'Task: ' + tarefaTexto,
    location: '',
    description: tarefaData + ' - ' + etiquetaTexto,
    start: {
      dateTime: tarefaData + 'T00:00:00-07:00',
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: tarefaData + 'T00:00:00-07:00',
      timeZone: 'America/Los_Angeles',
    },
    attendees: [
      {'email': 'kesiapereira2003@gmail.com'},
    ],
  };

  calendar.events.insert({
    auth: authClient,
    calendarId: 'Primario',
    resource: event,
  }, (err, event) => {
    if (err) {
      console.log('Erro de Conexão: ' + err);
      return;
    }
    console.log('Evento criado: %s', event.htmlLink);
  });
}

createEvent();