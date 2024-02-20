let inputField = document.querySelector(".app__input");
const addButton = document.querySelector(".app__submit");
let errorElement = document.querySelector(".app__error");
const tasksList = document.querySelector(".app__tasks");

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

const getFromStorage = function (key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : false;
}

const saveToStorage = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
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

        let li = "";

        tasksArr.forEach(task => {
        li += `<li class="app__task" draggable="true">
        <input class="app__checkbox" type="checkbox">
        <span class="app__checkmark"></span>
        ${task.taskValue}
        <span class="app__delete">X</span>
        </li>`
        });

        tasksList.innerHTML = li;


        console.log(userInput);

        inputField.value = "";
    };
};

addButton.addEventListener("click", addTask);


/*
TODO
[x] add task to the list
[x] show error message when user inserts invalid text
[ ] activate saving tasks in local storage
[ ] update database function
[ ] remove task function
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