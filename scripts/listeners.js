import { activeButton, addButton, allButton, 
    classesButtons, clearButton, completedButton, 
    inputField, tasksList, themeButton } from "./elements.js";
    
import { addTask, getFromStorage, initDataOnLoad, initTasks, renderTasks, 
    saveToStorage, startSorting, toggleTheme } from "./utils.js";

document.querySelector(".app__inputs").addEventListener("click", (e) => { 
    e.stopPropagation();
    addButton.classList.remove("hidden");
});

document.querySelector(".app__inputs").addEventListener("focusout", (e) => { 
    e.stopPropagation();
    addButton.classList.add("hidden");
});

document.querySelector(".app__input").addEventListener("focus", (e) => { 
    e.stopPropagation();
    addButton.classList.remove("hidden");
});

addButton.addEventListener("focus", (e) => { 
    e.stopPropagation();
    addButton.classList.remove("hidden");
});

classesButtons.forEach(button => button.addEventListener("keydown", (e) => {
    e.key === "Enter" && button.click();
}));

addButton.addEventListener("click", addTask);

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
    initDataOnLoad();
});

tasksList.addEventListener("dragover", startSorting);

tasksList.addEventListener("dragenter", e => e.preventDefault());

themeButton.addEventListener("click", toggleTheme);

themeButton.addEventListener("keydown", (e) => {
    e.key === "Enter" && themeButton.click();
});

inputField.addEventListener("keydown", (e) => {
    e.key === "Enter" && addTask();
});

