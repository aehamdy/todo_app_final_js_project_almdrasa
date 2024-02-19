let inputField = document.querySelector(".app__input");
const addButton = document.querySelector(".app__submit");
let errorElement = document.querySelector(".app__error");
const tasksList = document.querySelector(".app__tasks");

function showError(message) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
    inputField.value = "";
}

const addTask = function () {
    let userInput = inputField.value.trim();

    if (!userInput) {

        showError("Please enter a valid task");
        return;

    } else {
        errorElement.innerText = "";

    const task = `<li class="app__task" draggable="true">
    <input class="app__checkbox" type="checkbox">
    <span class="app__checkmark"></span>
    ${userInput}
    <span class="app__delete">X</span>
    </li>`;

    console.log(task);

    inputField.value = "";
    };
};

addButton.addEventListener("click", addTask);


/** #TODO
 * #[x] add task to the list
 * #[x] show error message when user inserts invalid text
 * #[ ] update database function
 * #[ ] remove task function
 * #[ ] clear completed task function
 * #[ ] show only active tasks function
 * #[ ] show only completed tasks function
 * #[ ] a variable to count the unchecked tasks
 */