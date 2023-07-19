"use strict"
let btnAddEl = document.getElementById('btnAdd')
let taskList = document.getElementById('list')
let taskEl = document.getElementById('task')
let todolist = []
let btnResetEl = document.getElementById('btnReset')


/*Fonction intermediare */
const updateDom = () => {
    let taskInputText = taskEl.value
    let listItem = document.createElement("li")
    let spanItemTrash = document.createElement("span")
    let spanItemPencil = document.createElement("span")
    listItem.classList.add('d-flex')
    spanItemTrash.classList.add('spanItemTrash', 'justify-content-end')
    spanItemPencil.classList.add('spanItemPencil')
    spanItemPencil.innerHTML = `<button><i class="bi bi-pencil"></i></button>`
    spanItemTrash.innerHTML = `<button><i class="bi bi-trash"></i></button>`
    listItem.id = Date.now()
    listItem.innerHTML = taskInputText
    taskList.appendChild(listItem)
    listItem.appendChild(spanItemPencil)
    listItem.appendChild(spanItemTrash)
    return listItem.id
}

// sauvegarde
const saveTask = (listItemId) => {
    console.log(listItemId)
    let taskElValue = listItemId + ' ' + taskEl.value
    todolist.push(taskElValue)
    let todolistStringify = JSON.stringify(todolist)
    localStorage.setItem('id, todolist', todolistStringify)
    // console.log(elementstringify);  
}


// const deleteTask = () => {

// }

const clearStorage = () => {
    localStorage.removeItem('todolist')
    taskList.innerHTML = ''
}

/* fonction principale */
const addTask = () => {
    let listItemId = updateDom()
    saveTask(listItemId)
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


