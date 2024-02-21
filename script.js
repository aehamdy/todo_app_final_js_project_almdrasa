let inputField = document.querySelector(".app__input");
const addButton = document.querySelector(".app__submit");
let errorElement = document.querySelector(".app__error");
const tasksList = document.querySelector(".app__tasks");
let taskItems = document.querySelectorAll(".app__task");
let taskCheckbox = document.querySelector(".app__checkbox");
const getDeleteButtons = () => document.querySelectorAll(".app__delete")


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

    tasksArr.forEach(task => {
    li += `<li class="app__task${task.isChecked ? ' checked': ''}">
    <input class="app__checkbox" type="checkbox">
    <span class="app__checkmark"></span>
    ${task.taskValue}
    <span class="app__delete">X</span>
    </li>`
    });

    tasksList.innerHTML = li;
};

const getFromStorage = function (key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : false;
}

const saveToStorage = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

const removeTask = (index) => {
    const answer = confirm(`Do you really want to remove this task? ${index}`);

    if (!answer) return;

    const tasks = getFromStorage("tasks");

    tasks.splice(index, 1);

    saveToStorage("tasks", tasks);
    renderTasks(tasks)
};

const initTaskListeners = () => {
    console.log({ getDeleteButtons:getDeleteButtons() });
    getDeleteButtons().forEach((button, index) => {
        button.addEventListener("click", (e, index) => removeTask(e, index));
    })
}

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

        renderTasks(tasksArr);
        initTaskListeners();

        inputField.value = "";
    };
};


addButton.addEventListener("click", addTask);


/*
TODO
[x] add task to the list
[x] show error message when user inserts invalid text
[x] activate saving tasks in local storage
[x] remove task function
[ ] update database function
[ ] clear completed task function
[ ] show only active tasks function
[ ] show only completed tasks function
[ ] a variable to count the unchecked tasks
[ ] activate toggling dark/light theme by js
[ ] save the desired theme in the local storage
[ ]animation on each task when hover over it (font size)

ADDED
-a button that adds tasks upon click on it
-style and animation to the button for better UX
-a validation for the input field
-animation upon invalid input for better UX
 */