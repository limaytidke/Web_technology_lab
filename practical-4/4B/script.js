function addTask() {
    let task = prompt(`Enter Task: `);
    let board = document.querySelector(".board");
    return board.innerHTML = `<div class="task"> <h4 id="task_id">${task}</h4></div> <div> <button type="button" id="delete" onclick="delete()"> Delete </button></div>` + board.innerHTML;
}

function clearAll() {
    let board = document.querySelector(".board");
    return board.innerHTML = ``;
}
