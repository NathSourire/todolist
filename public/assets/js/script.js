let addElement = document.querySelector('#addElement');
let element;
let counter = 0;

if (localStorage.getItem('elements')){
    element = JSON.parse(localStorage.getItem('elements'));
} else {
    element = []
}

addElement.addEventListener('click', (e) => {
    e.preventDefault();
    let inputEl = document.getElementById('task').value;
    element.push(inputEl);
    let elementstringify = JSON.stringify(element);
    localStorage.setItem('element', elementstringify);
    console.log(elementstringify);
    task.value = ''

})


// inputEl.forEach(inputEl => {
//     if (inputEl.id == 'task0') { 
// inputEl.id = 'task' + counter;
//     }
// });


