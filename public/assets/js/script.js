"use strict"
let btnAddEl = document.getElementById('btnAdd')
let taksList = document.getElementById('list')
let taskEl = document.getElementById('task')
let todolist = []
let btnResetEl = document.getElementById('btnReset')

/*Fonction intermediare */
const updateDom = () => {
    let taskInputText = taskEl.value
    let listItem = document.createElement("li")
    let spanItem = document.createElement("span")
    spanItem.innerHTML = `<i class="bi bi-trash"></i>`
    listItem.id = Date.now()
    listItem.innerHTML = taskInputText
    taksList.appendChild(listItem)
    listItem.appendChild(spanItem)
}

const saveTask = () => {
    let taskElValue = taskEl.value
    todolist.push(taskElValue)
    let todolistStringify = JSON.stringify(todolist)
    localStorage.setItem('todolist', todolistStringify)
    // console.log(elementstringify);  
}
const clearStorage = () => {
    localStorage.removeItem('todolist')
    taksList.innerHTML = ''
}

/* fonction principale */
const addTask = () => {
    updateDom()
    saveTask()
    taskEl.value = ''
}
const restoreTask = () => {
    if (localStorage.getItem('todolist')) {
        todolist = JSON.parse(localStorage.getItem('todolist'))
    }
}
const deleteAllTask = () => {
    clearStorage()
}

/* ecouteur d'evenement */
btnAddEl.addEventListener('click', addTask)
btnResetEl.addEventListener('click', deleteAllTask)
window.addEventListener('load', restoreTask)


