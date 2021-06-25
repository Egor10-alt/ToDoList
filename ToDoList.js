const formAddTask = document.querySelector("#form-add-task");
const taskList = document.querySelector("#task-list");
const taskListContainer = document.querySelector("#task-list-container");
const elemSpan = document.querySelector(".calc");
let count = 0;

formAddTask.addEventListener("submit",function (event){
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

})

function addTask(task){
    const listItem = document.createElement("li");
    listItem.innerText = task.title;
    listItem.classList.add("list-item");
    listItem.setAttribute("data-id",task.id);
    taskList.appendChild(listItem);

    const btnDelete = document.createElement("button");
    btnDelete.classList.add("btn-close");
    btnDelete.innerHTML = "&times;";
    listItem.appendChild(btnDelete);

}

function markContainer(){
    if (localStorage.length){
        taskListContainer.classList.add("has-tickets");
    }else{
        taskListContainer.classList.remove("has-tickets");
    }
}
//Чтение из Local Storage
for (let key in localStorage){
    if(localStorage.hasOwnProperty(key)){
        // console.log(key);
        // console.log(localStorage[key]);
        const task = JSON.parse(localStorage[key]);
        addTask(task);
    }
}


taskList.addEventListener("click",function (event){
    // task.done = true;
    if (!event.target.classList.contains("completed")){
        event.target.classList.add("completed");
        count = count - 1;
        elemSpan.innerText = count;
    }else{
        event.target.classList.remove("completed");
    }
   if (!event.target.classList.contains("btn-close")){
       return;
   }
    // const parentNode = event.target.parentNode;
    const { parentNode } = event.target;//<li>
   console.log(parentNode);
   const taskId = parentNode.getAttribute("data-id");
   localStorage.removeItem(taskId);
   parentNode.remove();
   
   markContainer();

});

