const todo = document.querySelector('#todo');
const progress = document.querySelector("#Progress");
const done = document.querySelector("#done");

const tasks = document.querySelectorAll(".task");
const toggelModal = document.querySelector("#toggel-modal")
const modal = document.querySelector(".modal");
const bgModal = document.querySelector(".bg");
const addTaskButton = document.querySelector(".add-task-button");
let dragElement = null;


tasks.forEach(task => {
task.addEventListener("drag",(e) => {
    // console.log("dragging",e);
    dragElement = task;
})
})

// progress.addEventListener("dragenter",(e) => {
//     progress.classList.add("hover-over");
// })

// progress.addEventListener("dragleave",(e) => {
//     // console.log("drag out",e);
//     progress.classList.remove("hover-over");

// })


// done.addEventListener("dragenter",(e) => {
//     done.classList.add("hover-over");
// })

// done.addEventListener("dragleave",(e) => {
//     // console.log("drag out",e);
//     done.classList.remove("hover-over");

// })


//this code is repetative so we make a function to do that

function addDragEventsOnColumn(column) {
    column.addEventListener("dragenter",(e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    })
    column.addEventListener("dragleave",(e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    })

    column.addEventListener("dragover",(e) => {
        e.preventDefault();
    })

    column.addEventListener("drop",(e) =>{
    //    console.log("onDrag",e);
       console.log("dropped",dragElement,column);

       column.appendChild(dragElement);
       column.classList.remove('hover-over');
    
    })
}

addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);
addDragEventsOnColumn(todo);


//now i want to make the add new Task Button functional

toggelModal.addEventListener("click",(e)=> {
    e.preventDefault();
    modal.classList.toggle("active");
})

bgModal.addEventListener("click",()=> {
    modal.classList.remove("active");
});


addTaskButton.addEventListener("click",() => {
    const taskTitle = document.querySelector("#task-title-input").value;
    const taskDesc = document.querySelector("#task-description-input").value;

    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable","true")

    div.innerHTML = `
    <h2>${taskTitle} </h2>
    <p>${taskDesc}</p>
    <button>Delete</button>
    `
    todo.appendChild(div);

    modal.classList.remove("active");
})