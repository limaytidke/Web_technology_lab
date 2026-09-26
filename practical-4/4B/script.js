let id_num = 0;
let board = document.querySelector(".board");

function addTask() {
    let task = prompt(`Enter Task: `);

    if (task === '') {
        alert("Task can't be empty");
        return;
    }
    id_num += 1;
    const newTaskDiv = document.createElement('div');
    const newDelDiv = document.createElement('div');
    
    newTaskDiv.innerHTML = `<h4 id="task" class="${id_num}">${task}</h4>`
    newDelDiv.innerHTML = `<button type="button" id="delete" class="${id_num}" onclick="deleteTask(this.class)"> Delete </button>`

    board.append(newTaskDiv,newDelDiv);
}

function clearAll() {
    return board.innerHTML = ``;
}

function deleteTask(obj) {
    const elements = document.querySelectorAll(`.${obj}`);
    elements.forEach(element => {
        element.remove();
    });
}
