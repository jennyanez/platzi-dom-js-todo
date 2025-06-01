const taskForm = document.getElementById("task-form")
const taskList = document.getElementById("task-list")

// Evento para agregar elemento al formulario, de tipo submit
taskForm.addEventListener("submit", (event) => {
    event.preventDefault()    // ya no refresca la pagina

    const taskInput = document.getElementById("task-input")
    const task = taskInput.value
    
    if(task) {
        taskList.append(createTaskElement(task))
        taskInput.value = ''
    }
})

function createTaskElement(task) {
    const originalLi = document.querySelector(".task-list_task")
    const newTask = originalLi.cloneNode(true)
    const newTaskText = newTask.querySelector('.task-list_task .task-content p');
    newTaskText.textContent = task
    return newTask
}

// Delegacion de eventos para modificar / eliminar tareas
taskList.addEventListener("click", (event) => {
    
    // Eliminar tareas
    if (event.target.classList.contains("delete-task-btn")) {
        deleteTask(event.target.closest("li"))
    } 
    // Editar tareas
    else if(event.target.classList.contains("edit-task-btn")){
        editTask(event.target.closest("li"))
    }
    // Terminar tarea
    else if(event.target.classList.contains("change-status-btn")){
        changeStatus(event.target.closest("li"))
    }
})

/*
    FUNCIONES PARA LOS EVENTOS
*/

// Funcion para eliminar elementos
function deleteTask(taskItem){
    if(confirm("Estas seguro de querer eliminar este elemento")) {
        taskItem.remove()
    }
}

// Funcion para editar elementos
function editTask(taskItem) {
    const newTaskText = prompt("Edita tu tarea: ", taskItem.querySelector('.task-list_task .task-content p').textContent)
    
    if(newTaskText !== null) {
        taskItem.querySelector('.task-list_task .task-content p').textContent = newTaskText
    }
}

// Funcion para cambiar estado
function changeStatus(taskItem){
    taskItem.querySelector('.task-list_task .task-content').classList.toggle("completed")
    taskItem.querySelector('.task-list_task .task-content .task-status').classList.toggle("completed")
}