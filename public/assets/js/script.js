let addElement = document.querySelector("#addElement")
let element ;

console.log(element);
console.log(addElement);

if (localStorage.getItem('elements')){
    element = JSON.parse(localStorage.getItem('elements'))
} else {
    element = []
}

addElement.addEventListener('click', (e) => {
    e.preventDefault()
    let inputEl = document.querySelector('#task').value  
    element.push(inputEl)
    let elementstringify = JSON.stringify(element)
    localStorage.setItem('element', elementstringify)
    console.log(elementstringify);
    task.value = ''
})
