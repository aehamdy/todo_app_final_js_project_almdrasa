import { bgElement, 
    bodyElement, 
    errorElement, 
    getDeleteButtons, 
    getLis, 
    inputField, 
    tasksCount, 
    tasksList, 
    themeIcon } from "./elements.js";

export function showError(message) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
};

export function shakeOnError() {
    inputField.classList.add("app__shake");

    setTimeout(() => {
        inputField.classList.remove("app__shake")
    }, 1700);
};

export const renderTasks = function (tasksArr) {
    let li = "";

    tasksArr.forEach((task) => {
    li += `<li class="app__task${task.isChecked ? ' checked': ' unchecked'}" draggable="true" tabindex="0">
    <input class="app__checkbox" type="checkbox" tabindex="-1">
    <span class="app__checkmark"></span>
    ${task.taskValue}
    <span class="app__delete" tabindex="0">X</span>
    </li>`
    });

    tasksList.innerHTML = li;
    taskCounter();
};

export const getFromStorage = function (key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : false;
};

export const saveToStorage = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};

export const removeTask = (e, index) => {
    e.stopPropagation();
    const data = getFromStorage("tasks");

    const answer = confirm(`Do you really want to remove "${data[index].taskValue}" task from the list?`);
    if (!answer) return;

    // const tasks = getFromStorage("tasks");

    data.splice(index, 1);

    saveToStorage("tasks", data);
    initTasks(data)
};

export const initTaskListeners = () => {

    getDeleteButtons().forEach((button, index) => {
        button.addEventListener("click", (e) => removeTask(e, index));
    });

    getDeleteButtons().forEach((button, index) => button.addEventListener("keydown", (e) => {
        e.key === "Enter" && removeTask(e, index);
    }));


    // getLis().forEach((item => item.addEventListener("focus", () => {
    //     const del = item.querySelector(".app__delete");
    //     console.log(`on focus ${del}`);
    //     del.addEventListener("focus", () => {del.style.opacity="1"})
    //     del.style.opacity = "1";
    // })));

    // getLis().forEach(item => item.addEventListener("blur", () => {
    //     const del = item.querySelector(".app__delete");
    //     del.addEventListener("blur", () => {del.style.opacity="0"})
    //     del.style.opacity = "0";
    // }));

    getLis().forEach(item => item.addEventListener("mouseenter", () => {
        const del = item.querySelectorAll(".app__delete");
        del[0].style.opacity = "1";
    }))

    getLis().forEach(item => item.addEventListener("mouseleave", () => {
        const del = item.querySelectorAll(".app__delete");
        del[0].style.opacity = "0";
    }))

    getLis().forEach((li, index) => {
        li.addEventListener("click", (e) => toggleTask(e, index));
    });

    getLis().forEach(item => item.addEventListener("keydown", (e) => {
        e.key === "Enter" && item.click()
    }));

    getLis().forEach(li => {
        li.addEventListener("dragstart", (e) => {
            e.target.classList.add("dragging");
        });
        li.addEventListener("dragend", (e) => {
            e.target.classList.remove("dragging");
        })
    });
};

export const addTask = function () {
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
        inputField.focus();
    };
};

export const initDataOnLoad = () => {
    initTasks(getFromStorage("tasks"));
    getFromStorage("theme") && toggleTheme();
    
};

export const initTasks = (tasks) => {
    renderTasks(tasks);
    initTaskListeners();
    // restoreTaskOrderFromLocalStorage();
};

export const toggleTask = (e, index) => {
    const tasks = getFromStorage("tasks");
    e.target.classList.toggle("checked");
    e.target.classList.toggle("unchecked");
    tasks[index].isChecked = !tasks[index].isChecked;
    saveToStorage("tasks", tasks);
    taskCounter();
};

export const taskCounter = () => {
    const data = getFromStorage("tasks");
    let tasks = data.filter((task) => {
        return task.isChecked === false;
    });
    tasksCount.innerHTML = tasks.length > 0 ? tasks.length : 0;
};

export const toggleTheme = () => {
    bodyElement.classList.toggle("app__theme--isLight");
    saveToStorage("theme", bodyElement.classList.contains("app__theme--isLight"));
    if (getFromStorage("theme") === true) {
        themeIcon.style.backgroundImage = "url(./images/icon-moon.svg)";
        bgElement.style.backgroundImage = "url(./images/bg-desktop-light.jpg)";
    } else {
        themeIcon.style.backgroundImage = "url(./images/icon-sun.svg)"
        bgElement.style.backgroundImage = "url(./images/bg-desktop-dark.jpg)";
    }
};

export const startSorting = (e) => {
    e.preventDefault();

    const draggingItem = document.querySelector(".dragging");
    const siblingItems = [...tasksList.querySelectorAll(".app__task:not(.dragging)")];

    let nextSibling = siblingItems.reduce((closest, sibling) => {
        const rect = sibling.getBoundingClientRect();
        const offset = e.clientY - rect.top - rect.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: sibling };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;

    if (nextSibling !== draggingItem.nextSibling) {
        tasksList.insertBefore(draggingItem, nextSibling);
        updateTaskOrderInLocalStorage();
    }
};

export const updateTaskOrderInLocalStorage = () => {
    const tasks = [...tasksList.querySelectorAll(".app__task")];
    let taskArr = [];
    tasks.forEach(task => {
        // Remove the delete button span from the text content
        let taskText = "";
        task.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                taskText += node.textContent.trim();
            }
        });

        if (task.classList.contains("unchecked")) {
            let each = {
                taskValue: taskText,
                isChecked: false
            } 
            taskArr.push(each);
        } else if (task.classList.contains("checked")) {
            let each = {
                taskValue: taskText,
                isChecked: true
            }
            taskArr.push(each);
        }
    });
    saveToStorage("tasks", taskArr);
};

