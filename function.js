import {
    taskList,
    taskListContainer,
    elemSpan
} from "./vars.js";


export function addTask(task){
    const listItem = document.createElement("li");
    listItem.innerText = task.title;
    listItem.classList.add("list-item");
    listItem.setAttribute("data-id",task.id);
    taskList.appendChild(listItem);

    const btnCheck = document.createElement("button");
    btnCheck.classList.add("btn-check");
    listItem.appendChild(btnCheck);

    const btnDelete = document.createElement("button");
    btnDelete.classList.add("btn-delete");
    btnDelete.innerHTML = "&times;";
    listItem.appendChild(btnDelete);

    if (task.done){
        listItem.classList.add("completed");
    }
}

export function markContainer(){
    if (localStorage.length){
        taskListContainer.classList.add("has-tickets");
    }else{
        taskListContainer.classList.remove("has-tickets");
    }
}


export function formSubmitHandler(event){
    event.preventDefault();//метод который отменяет у формы ее дефолтное выполнение
    // console.log(this.children.title.value);//title - name = "title";
    const task = {
        title:this.children.title.value,//input value
        done: false,
        id: new Date().getTime(),
    };

    addTask(task);

    localStorage.setItem(task.id,JSON.stringify(task));
    markContainer();
    this.reset();//formAddTask.reset -отчищает наш инпут
    calculate();

}


export const closeBtnClickHandler = (event) => {

    if (!event.target.classList.contains("btn-delete")){
        return;
    }
    // const parentNode = event.target.parentNode;
    const { parentNode } = event.target;//<li>
    console.log(parentNode);
    const taskId = parentNode.getAttribute("data-id");
    localStorage.removeItem(taskId);
    parentNode.remove();

    calculate();
    markContainer();
}


export const checkBtnHandler = (event) => {

    if (!event.target.classList.contains("btn-check")){
        return;
    }
    // const parentNode = event.target.parentNode;
    const { parentNode } = event.target;//<li>
    const taskId = parentNode.getAttribute("data-id");
    parentNode.classList.toggle("completed");
    const task = JSON.parse(localStorage.getItem(taskId));
    task.done = !task.done;
    localStorage.setItem(taskId,JSON.stringify(task));
    calculate();
}


export function calculate() {
    let count = 0;
    elemSpan.classList.add('calc');
    document.querySelector(".footer").appendChild(elemSpan);

    for (let value in localStorage){
        if (localStorage.hasOwnProperty(value)){
            let objValue  = JSON.parse(localStorage.getItem(value));
            if (objValue.done === false){
                count = count + 1;
                elemSpan.innerText = count + " task left";
            }
        }
    }
}






