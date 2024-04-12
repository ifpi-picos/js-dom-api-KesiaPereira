// Função para adicionar uma nova tarefa
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var tagInput = document.getElementById("tagInput");
    var taskText = taskInput.value.trim();
    var tagText = tagInput.value.trim(); // Obtém o valor do campo de entrada da etiqueta

    if (taskText !== "") {
        var taskItem = document.createElement("li");

        // Cria um elemento de span para o texto da tarefa
        var taskTextSpan = document.createElement("span");
        taskTextSpan.textContent = taskText;
        taskItem.appendChild(taskTextSpan); // Adiciona o elemento de texto da tarefa ao item da lista

        // Adiciona a etiqueta como uma classe ao item da lista
        if (tagText !== "") {
            taskItem.classList.add(tagText.toLowerCase()); // Converte a etiqueta para minúsculas e a adiciona como uma classe
            var tagSpan = document.createElement("span");
            tagSpan.textContent = "[" + tagText + "] ";
            taskItem.insertBefore(tagSpan, taskTextSpan); // Adiciona a etiqueta ao lado do texto da tarefa
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
