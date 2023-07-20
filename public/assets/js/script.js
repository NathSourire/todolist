"use strict";

const taskList = document.getElementById("list");
const taskEl = document.getElementById("task");
const btnAddEl = document.getElementById("btnAdd");
const btnResetEl = document.getElementById("btnReset");
const completedTaskList = document.getElementById("CompletedTaskList");

let todolist = [];

// Fonction pour ajouter une tâche à la liste principale
const addTask = () => {
    if (taskEl.value === "") {
        alert("Ajoutez une tâche s'il vous plaît !");
        return false;
    }

    const taskInputText = taskEl.value;
    const listItem = document.createElement("li");
    listItem.classList.add("d-flex");
    listItem.id = Date.now();
    listItem.innerHTML = `
        <div class="textTask form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
            <span>${taskInputText}</span>
        </div>
        <div class="editDeleteBtn">
            <button class="btnTrashLi" type="button"><i class="bi bi-trash"></i></button>
        </div>
    `;

    taskList.appendChild(listItem);

    const checkbox = listItem.querySelector(".form-check-input");
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            moveToCompletedTasks(listItem);
        } else {
            moveBackToTaskList(listItem);
        }
    });

    saveTask(listItem.id, taskInputText);
    taskEl.value = "";
};

// Fonction pour déplacer une tâche vers la liste des tâches terminées
const moveToCompletedTasks = (listItem) => {
    listItem.style.textDecoration = "line-through";
    completedTaskList.appendChild(listItem);

    // Mettre à jour le localStorage pour marquer la tâche comme terminée
    updateLocalStorage(listItem.id, true);
};

// Fonction pour déplacer une tâche vers la liste principale
const moveBackToTaskList = (listItem) => {
    listItem.style.textDecoration = "none";
    taskList.appendChild(listItem);

    // Mettre à jour le localStorage pour marquer la tâche comme non terminée
    updateLocalStorage(listItem.id, false);
};

// Fonction pour enregistrer une tâche dans le localStorage
const saveTask = (listItemId, taskText) => {
    todolist.push({ id: listItemId, text: taskText });
    localStorage.setItem("todolist", JSON.stringify(todolist));
};

// Fonction pour mettre à jour le localStorage lors du déplacement d'une tâche
const updateLocalStorage = (listItemId, completed) => {
    const updatedList = todolist.map((task) => {
        if (task.id === listItemId) {
            return { ...task, completed: completed };
        }
        return task;
    });

    todolist = updatedList;
    localStorage.setItem("todolist", JSON.stringify(todolist));
};

// Fonction pour restaurer les tâches depuis le localStorage
const restoreTask = () => {
    if (localStorage.getItem("todolist")) {
        todolist = JSON.parse(localStorage.getItem("todolist"));

        todolist.forEach((task) => {
            const listItem = document.createElement("li");
            listItem.classList.add("d-flex");
            listItem.id = task.id;
            listItem.innerHTML = `
                <div class="textTask form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                    <span>${task.text}</span>
                </div>
                <div class="editDeleteBtn">
                    <button class="btnTrashLi" type="button"><i class="bi bi-trash"></i></button>
                </div>
            `;

            if (task.completed) {
                listItem.style.textDecoration = "line-through";
                completedTaskList.appendChild(listItem);
            } else {
                taskList.appendChild(listItem);
            }

            const checkbox = listItem.querySelector(".form-check-input");
            checkbox.checked = task.completed;

            checkbox.addEventListener("change", () => {
                if (checkbox.checked) {
                    moveToCompletedTasks(listItem);
                } else {
                    moveBackToTaskList(listItem);
                }
            });
        });
    }
};

// Fonction pour supprimer toutes les tâches et effacer le localStorage
const deleteAllTask = () => {
    localStorage.removeItem("todolist");
    taskList.innerHTML = "";
    completedTaskList.innerHTML = "";
};

// Ajouter des écouteurs d'événements
btnAddEl.addEventListener("click", addTask);
btnResetEl.addEventListener("click", deleteAllTask);
window.addEventListener("load", restoreTask);
