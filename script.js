let inputField = document.querySelector(".app__input");
const addButton = document.querySelector(".app__submit");
let errorElement = document.querySelector(".app__error");
const tasksList = document.querySelector(".app__tasks");
let taskItems = document.querySelectorAll(".app__task");
let taskCheckbox = document.querySelector(".app__checkbox");
const activeButton = document.querySelector(".active-label");
const completedButton = document.querySelector(".completed-label");
const allButton = document.querySelector(".all-label");
const clearButton = document.querySelector(".clear-button");
const tasksCount = document.querySelector(".app__tasks-left");

const bodyElement = document.querySelector("body");
const themeButton = document.querySelector(".app__theme-toggler");
const themeIcon = document.querySelector(".app__theme-image");

const getDeleteButtons = () => document.querySelectorAll(".app__delete")
const getLis = () => document.querySelectorAll(".app__task");



function showError(message) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
};

function shakeOnError() {
    inputField.classList.add("app__shake");

    setTimeout(() => {
        inputField.classList.remove("app__shake")
    }, 1700);
};

const renderTasks = function (tasksArr) {
    let li = "";

    tasksArr.forEach((task) => {
    li += `<li class="app__task${task.isChecked ? ' checked': ' unchecked'}">
    <input class="app__checkbox" type="checkbox">
    <span class="app__checkmark"></span>
    ${task.taskValue}
    <span class="app__delete">X</span>
    </li>`
    });

    tasksList.innerHTML = li;
    taskCounter();
};


const getFromStorage = function (key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : false;
};

const saveToStorage = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};

const removeTask = (e, index) => {
    const data = getFromStorage("tasks");

    const answer = confirm(`Do you really want to remove "${data[index].taskValue}" task from the list?`);

    if (!answer) return;

    const tasks = getFromStorage("tasks");

    tasks.splice(index, 1);

    saveToStorage("tasks", tasks);
    initTasks(tasks)
};

const initTaskListeners = () => {
    getDeleteButtons().forEach((button, index) => {
        button.addEventListener("click", (e) => removeTask(e, index));
    });
    getLis().forEach((li, index) => {
        li.addEventListener("click", (e) => toggleTask(e, index));
    })
};

const addTask = function () {
    let userInput = inputField.value.trim();
    
    if (!userInput) {
        
        showError("Please enter a valid task");
        shakeOnError();
        inputField.value = "";

        return;

    } else {
        errorElement.textContent = "";

        const task = {
            taskValue: userInput,
            isChecked: false,
        };

        const tasksArr = getFromStorage("tasks") || [];
        
        tasksArr.push(task);
        
        saveToStorage("tasks", tasksArr);

        initTasks(tasksArr);

        inputField.value = "";
    };
};

addButton.addEventListener("click", addTask);

const initDataOnLoad = () => {
    initTasks(getFromStorage("tasks"));
    getFromStorage("theme") && toggleTheme();
};

const initTasks = (tasks) => {
    renderTasks(tasks);
    initTaskListeners();
};

const toggleTask = (e, index) => {
    const tasks = getFromStorage("tasks");
    e.target.classList.toggle("checked");
    e.target.classList.toggle("unchecked");
    tasks[index].isChecked = !tasks[index].isChecked;
    saveToStorage("tasks", tasks);
    taskCounter();
};

activeButton.addEventListener("click", () => {
    if (tasksList.classList.contains("show-completed")) {
        tasksList.classList.remove("show-completed")
    };
    tasksList.classList.add("show-active");
});

completedButton.addEventListener("click", () => {
    if (tasksList.classList.contains("show-active")) {
        tasksList.classList.remove("show-active");
    }
    tasksList.classList.add("show-completed");
});

allButton.addEventListener("click", () => {
    tasksList.classList.contains("show-active") && tasksList.classList.remove("show-active");
    tasksList.classList.contains("show-completed") && tasksList.classList.remove("show-completed");
});

clearButton.addEventListener("click", () => {
    const data = getFromStorage("tasks");
    let tasks = data.filter(task => {
        return task.isChecked === false;
    });
    saveToStorage("tasks", tasks);
    renderTasks(tasks);
});

const taskCounter = () => {
    const data = getFromStorage("tasks");
    let tasks = data.filter((task) => {
        return task.isChecked === false;
    });
    tasksCount.innerHTML = tasks.length > 0 ? tasks.length : 0;
};

const toggleTheme = () => {
    bodyElement.classList.toggle("app__theme--isLight");
    saveToStorage("theme", bodyElement.classList.contains("app__theme--isLight"));
};

themeButton.addEventListener("click", toggleTheme);

initDataOnLoad();



/*
TODO
[x] add task to the list
[x] show error message when user inserts invalid text
[x] activate saving tasks in local storage
[x] remove task function
[x] update database function
[x] display all tasks every time user load the page
[x] toggle tasks function
[x] show only active tasks function
[x] show only completed tasks function
[x] clear completed task function
[x] a variable to count the unchecked tasks
[ ] activate toggling dark/light theme by js
[ ] save the desired theme in the local storage
[ ] animation on each task when hover over it (font size)

ADDED
-a button that adds tasks upon click on it
-style and animation to the button for better UX
-a validation for the input field
-animation upon invalid input for better UX
 */