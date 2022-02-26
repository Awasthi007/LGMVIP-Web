var tasks = [];
const tasksList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");

function addTasktoDOM(task) {
    let lis = document.createElement("li");

    lis.innerHTML = `
    <input type="checkbox" onclick = "clickH(${task.id})" id = "${task.id}" ${task.completed ? "checked" : ""
        } class="custom-checkbox">
    <label  for= "${task.id}">${task.title}</label>
   <img src="bin.png" alt="del" class="delete" data-id="${task.id}" /> 
     
    `;

    tasksList.append(lis);
}

function renderList() {
    tasksList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        addTasktoDOM(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}

function toggleTask(taskId) {
    alert("called");
    let completedTask = tasks.filter(function (task) {
        return task.id === Number(taskId);
    });
    console.log(completedTask);
    if (completedTask.length > 0) {
        let currentTask = completedTask[0];
        currentTask.completed = !currentTask.completed;
        renderList();
        let clickcheckbox = document.getElementsById(taskId);
        console.log(clickcheckbox);
        clickcheckbox.addEventListener("click", function () { });
        showNotification("task toggled succesfully");

        return;
    }
    showNotification("could not toggle task");
    return;
}

function deleteTask(taskId) {
    const newTask = tasks.filter(function (task) {
        return task.id != Number(taskId);
    });

    tasks = newTask;
    renderList();
    showNotification("task deleted succesfully");
    return;
}

function addTask(task) {
    if (task) {
        tasks.push(task);
        renderList();
        showNotification("task added succesfuly");
        return;
    }

    showNotification("cant be added");
    return;
}

function showNotification(text) {
    alert(text);
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        const text = event.target.value;
        console.log(text);

        if (!text) {
            showNotification("enter some text");
            return;
        }

        const task = {
            title: text,
            id: Date.now(),
            completed: false,
        };

        event.target.value = "";
        addTask(task);
    }
}

function handleInputKeyPress(event) {
    let target = event.target;
    console.log(target);

    if (target.className === "delete") {
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    } else if (target.className === "custom-checkbox") {
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
}
function fetchToDos() {
    // get request
    fetch("https://jsonplaceholder.typicode.com/todos")
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            tasks = data.slice(0, 10);
            renderList();
        })
        .catch(function (error) {
            console.log("error", error);
        });
}
function clickH(taskId) {
    let clickedCheckbox = document.getElementById(taskId);
    for (let task of tasks) {
        if (task.id == taskId) {
            console.log("matched", taskId, task.id);
            task.completed = !task.completed;
            return;
        }
    }
}
function initialiseApp() {
    fetchToDos();
    addTaskInput.addEventListener("keyup", handleKeyPress);
    //document.addEventListener("click", handleInputKeyPress);
}
initialiseApp();

///////////////    ADDING FUNCTIONALITY TO THE DELETE AND CHECKBOX //////////////

//  selffff

// function clickH() {
//   alert(clicked);
//   //   const tick = document.getElementById("list").querySelectorAll("input");

//   //   for (let i = 0; i < tick.length; i++) {
//   //     tick[i].addEventListener("click", function () {
//   //       let target = event.target;
//   //       let eventId = target.id;

//   //       var stringEventId = String(eventId);
//   //       console.log(stringEventId);
//   //       toggleTask(stringEventId);
//   //     });
//   //   }
// }