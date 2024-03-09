export let inputField = document.querySelector(".app__input");
export const addButton = document.querySelector(".app__submit");
export let errorElement = document.querySelector(".app__error");
export const tasksList = document.querySelector(".app__tasks");
export let taskItems = document.querySelectorAll(".app__task");
export let taskCheckbox = document.querySelector(".app__checkbox");
export const activeButton = document.querySelector(".active-label");
export const completedButton = document.querySelector(".completed-label");
export const allButton = document.querySelector(".all-label");
export const clearButton = document.querySelector(".clear-button");
export const tasksCount = document.querySelector(".app__tasks-left");
export const bodyElement = document.querySelector("body");
export const bgElement = document.querySelector(".background-image")
export const themeButton = document.querySelector(".app__theme-toggler");
export const themeIcon = document.querySelector(".app__theme-image");
export const classesButtons = document.querySelectorAll(".app__label");

export const getDeleteButtons = () => document.querySelectorAll(".app__delete")
export const getLis = () => document.querySelectorAll(".app__task");