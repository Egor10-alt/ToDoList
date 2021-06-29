import {
    addTask,
    markContainer,
    formSubmitHandler,
    closeBtnClickHandler,
    checkBtnHandler
} from "./function.js";

import {
    formAddTask,
    taskList
} from "./vars.js";

formAddTask.addEventListener("submit",formSubmitHandler);
taskList.addEventListener("click",closeBtnClickHandler);
taskList.addEventListener("click",checkBtnHandler);

markContainer();


//Чтение из Local Storage
for (let key in localStorage){
    if(localStorage.hasOwnProperty(key)){
        // console.log(key);
        // console.log(localStorage[key]);
        const task = JSON.parse(localStorage[key]);
        addTask(task);
    }
}




