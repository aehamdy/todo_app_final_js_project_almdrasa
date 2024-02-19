let inputField = document.querySelector(".app__input");
const addButton = document.querySelector(".app__submit");
const tasksList = document.querySelector(".app__tasks");

    
addButton.addEventListener("click", () => {

    let userInput = inputField.value;

    const task = `<li class="app__task" draggable="true">
    <input class="app__checkbox" type="checkbox">
    <span class="app__checkmark"></span>
    ${userInput}
    <span class="app__delete">X</span>
    </li>`;

    inputField.value = "";
})