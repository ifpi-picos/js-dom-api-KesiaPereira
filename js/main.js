// Função para obter a data e hora atual da API do NTP
async function getCurrentDateTime() {
    try {
        const response = await fetch('https://worldtimeapi.org/api/ip');
        const data = await response.json();
        return new Date(data.utc_datetime);
    } catch (error) {
        console.error('Erro ao obter a data e hora atual:', error);
        return null;
    }
}

// Função para adicionar uma nova tarefa
async function addTask() {
    var taskInput = document.getElementById("taskInput");
    var tagInput = document.getElementById("tagInput");
    var dueDateInput = document.getElementById("dueDateInput"); // Novo campo de entrada para a data limite
    var taskText = taskInput.value.trim();
    var tagText = tagInput.value.trim(); // Obtém o valor do campo de entrada da etiqueta
    var dueDateText = dueDateInput.value; // Obtém o valor do campo de entrada da data limite

    if (taskText !== "") {
        var taskItem = document.createElement("li");

        // Adiciona a etiqueta como uma classe ao item da lista
        if (tagText !== "") {
            taskItem.classList.add(tagText.toLowerCase()); // Converte a etiqueta para minúsculas e a adiciona como uma classe

            // Cria um elemento de span para a etiqueta
            var tagSpan = document.createElement("span");
            tagSpan.textContent = "[" + tagText + "] ";
            taskItem.appendChild(tagSpan); // Adiciona o elemento de span da etiqueta ao item da lista
        }

        // Cria um elemento de span para o texto da tarefa
        var taskTextSpan = document.createElement("span");
        taskTextSpan.textContent = taskText;
        taskItem.appendChild(taskTextSpan); // Adiciona o elemento de span do texto da tarefa ao item da lista

        // Adiciona a data limite ao lado do texto da tarefa
        if (dueDateText !== "") {
            var dueDateSpan = document.createElement("span");
            dueDateSpan.textContent = " - Due: " + dueDateText;
            
            // Verifica se a data limite já passou
            var currentDate = new Date();
            var dueDate = new Date(dueDateText);
            if (dueDate < currentDate) {
                dueDateSpan.style.color = "red"; // Define a cor vermelha para a data limite se ela já tiver passado
            }
            
            taskItem.appendChild(dueDateSpan); // Adiciona o elemento de span da data limite ao item da lista
        }

        var taskButtons = document.createElement("div");
        taskButtons.classList.add("taskButtons");

        var completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.onclick = function() {
            completeTask(taskItem);
        };
        taskButtons.appendChild(completeButton);

        var removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = function() {
            removeTask(taskItem);
        };
        taskButtons.appendChild(removeButton);

        taskItem.appendChild(taskButtons);

        document.getElementById("taskList").appendChild(taskItem);
        taskInput.value = "";
        tagInput.value = ""; // Limpa o campo de entrada da etiqueta
        dueDateInput.value = ""; // Limpa o campo de entrada da data limite

        // Salvar no armazenamento local
        saveTasks();
    }
}

// Função para concluir uma tarefa
function completeTask(taskItem) {
    taskItem.classList.toggle("completed");

    // Salvar no armazenamento local
    saveTasks();
}

// Função para remover uma tarefa
function removeTask(taskItem) {
    taskItem.remove();

    // Salvar no armazenamento local
    saveTasks();
}

// Função para salvar as tarefas no armazenamento local
function saveTasks() {
    var tasks = [];
    var taskItems = document.querySelectorAll("#taskList li");
    taskItems.forEach(function(taskItem) {
        var task = {
            text: taskItem.querySelector("span").textContent, // Obtém o texto da tarefa do elemento de span
            completed: taskItem.classList.contains("completed")
        };
        tasks.push(task);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Função para carregar as tarefas do armazenamento local ao carregar a página
window.onload = function() {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task) {
        var taskItem = document.createElement("li");
        var taskTextSpan = document.createElement("span"); // Cria um elemento span para o texto da tarefa
        taskTextSpan.textContent = task.text; // Define o texto da tarefa no elemento span
        taskItem.appendChild(taskTextSpan); // Adiciona o elemento span ao item da lista

        if (task.completed) {
            taskItem.classList.add("completed");
        }

        var taskButtons = document.createElement("div");
        taskButtons.classList.add("taskButtons");

        var completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.onclick = function() {
            completeTask(taskItem);
        };
        taskButtons.appendChild(completeButton);

        var removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = function() {
            removeTask(taskItem);
        };
        taskButtons.appendChild(removeButton);

        taskItem.appendChild(taskButtons);

        document.getElementById("taskList").appendChild(taskItem);
    });
};
