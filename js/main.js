// Função para adicionar uma nova tarefa
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();
    if (taskText !== "") {
        var taskItem = document.createElement("li");
        taskItem.textContent = taskText;

        var completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.onclick = function() {
            completeTask(taskItem);
        };

        var removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = function() {
            removeTask(taskItem);
        };

        var taskButtons = document.createElement("div");
        taskButtons.classList.add("taskButtons");
        taskButtons.appendChild(completeButton);
        taskButtons.appendChild(removeButton);

        taskItem.appendChild(taskButtons);

        document.getElementById("taskList").appendChild(taskItem);
        taskInput.value = "";

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
            text: taskItem.textContent,
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
        var taskText = document.createElement("span"); // Cria um elemento span para o texto da tarefa
        taskText.textContent = task.text; // Define o texto da tarefa no elemento span

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

        taskItem.appendChild(taskText); // Adiciona o elemento span ao item da lista
        taskItem.appendChild(taskButtons);

        document.getElementById("taskList").appendChild(taskItem);
    });
};
