let inputField = document.querySelector(".app__input");
const addButton = document.querySelector(".app__submit");
const tasksList = document.querySelector(".app__tasks");

const addTask = function () {
    let userInput = inputField.value;

    const task = `<li class="app__task" draggable="true">
    <input class="app__checkbox" type="checkbox">
    <span class="app__checkmark"></span>
    ${userInput}
    <span class="app__delete">X</span>
    </li>`;

    

    inputField.value = "";
}

addButton.addEventListener("click", addTask);


/** #TODO
 * [x] add task to the list
 * [ ] show error message when user doesn't insert a text
 * [ ] remove task function
 * [ ] update database function
 * [ ] clear completed task function
 * [ ] show only active tasks function
 * [ ] show only completed tasks function
 * [ ] a variable to count the unchecked tasks
 */