const taskForm = document.getElementById("task-form")
const taskList = document.getElementById("task-list")

// Cargar las tareas almacenadas en local storage
loadTasksFromLocalStorage()

/*
---------------
    EVENTOS
---------------
*/

// Evento para agregar elemento al formulario, de tipo submit
taskForm.addEventListener("submit", (event) => {
    event.preventDefault()    // ya no refresca la pagina

    const taskInput = document.getElementById("task-input")
    const task = taskInput.value
    
    if(task) {
        taskList.insertAdjacentHTML("beforeend", createTaskElement(task, "pending"))
        storeTaskInLocalStorage(task, "pending")
        taskInput.value = ''
    }
})

function createTaskElement(task, status) {
    // clonando un nodo ya hardcodeado 
    // const originalLi = document.querySelector(".task-list_task")   
    // const newTask = originalLi.cloneNode(true)
    // const newTaskText = newTask.querySelector('.task-list_task .task-content p');
    // newTaskText.textContent = task

    // para crear la estructura desde cero
    const newTask = `
        <li class="task-list_task">
                <div class="task-content ${status}">
                    <p>${task}</p>
                    <div class="task-status ${status}"></div>
                </div>
                <div class="task-buttons">
                    <button class="light-btn edit-task-btn">✏️</button>
                    <button class="light-btn delete-task-btn">🗑️</button>
                    <button class="light-btn change-status-btn">✅</button>
                </div>
            </li>
    `
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
------------------------------------
    FUNCIONES PARA LOS EVENTOS
------------------------------------
*/

// Funcion para eliminar elementos
function deleteTask(taskItem){
    if(confirm("Estas seguro de querer eliminar este elemento")) {
        taskItem.remove()
        updateLocalStorage()
    }
}

// Funcion para editar elementos
function editTask(taskItem) {
    const newTaskText = prompt("Edita tu tarea: ", taskItem.querySelector('.task-list_task .task-content p').textContent)
    
    if(newTaskText !== null) {
        taskItem.querySelector('.task-list_task .task-content p').textContent = newTaskText
        updateLocalStorage()
    }
}

// Funcion para cambiar estado
function changeStatus(taskItem){
    taskItem.querySelector('.task-list_task .task-content').classList.toggle("completed")
    taskItem.querySelector('.task-list_task .task-content .task-status').classList.toggle("completed")
    updateTaskStatusInLocalStorage()
}

/*
-------------------------------
    PERSISTENCIA DE DATOS
-------------------------------
*/

// Guardar elementos en localStorage
function storeTaskInLocalStorage(task) {
    // convertimos lo que tenemos en local storage en objeto o array
    // si esta vacio es un array vacio
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]")

    console.log(task)

    // guardar la tarea nueva en el arreglo
    tasks.push({
        text: task,
        status: "pending",
    })

    // guardar en local storage la lista nuevamente
    // convirtiendola en json again
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

// Renderizar las tareas de local storage en el DOM
function loadTasksFromLocalStorage() {
    // la misma funcion anterior para verificar si hay elementos
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]")

    console.log(tasks)

    if(tasks.length > 0) {
        tasks.forEach((task) => {
            console.log(task)
            taskList.insertAdjacentHTML("beforeend", createTaskElement(task.text, task.status))
        })
    } 
}

// Editar tareas en local storage
function updateLocalStorage(){
    const tasks = Array.from(taskList.querySelectorAll("li")).map((li) => {
        const taskText = li.querySelector("p").textContent;
        const isCompleted = li.querySelector(".task-status").classList.contains("completed") ? "completed" : "pending";
        return { text: taskText, status: isCompleted };
    });
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

// Toogle para el tema
const themeToggleButton = document.getElementById("toggle-theme-btn");

const currentTheme = localStorage.getItem("theme");

themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme")
   
    // Cambiar el icono del botón
    themeToggleButton.innerText = document.body.classList.contains("dark-theme") ? "🌞" : "🌙"


    const theme = document.body.classList.contains("dark-theme") ? "dark" : "light"

    console.log(theme)

    localStorage.setItem("theme", theme)
})

if(currentTheme === "dark") {
    document.body.classList.add("dark-theme")
}

// Actualizar el estado de las tareas en el local storage
function updateTaskStatusInLocalStorage() {
    const tasks = Array.from(taskList.querySelectorAll("li")).map((li) => {
        const taskText = li.querySelector("p").textContent;
        const isCompleted = li.querySelector(".task-status").classList.contains("completed") ? "completed" : "pending";
        return { text: taskText, status: isCompleted };
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}