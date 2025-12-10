let tasksData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#Progress");
const done = document.querySelector("#done");

const tasks = document.querySelectorAll(".task");
const toggelModal = document.querySelector("#toggel-modal");
const modal = document.querySelector(".modal");
const bgModal = document.querySelector(".bg");
const addTaskButton = document.querySelector(".add-task-button");
let dragElement = null;

function addTaskEle(title,desc,column){
    const div = document.createElement("div");
    div.classList.add(".task");
    div.setAttribute("draggable",true);
    
     div.innerHTML = `
        <h2> ${task.title} </h2>
        <p>${task.desc}</P>
        <button>Delete</button>
        `;
    column.appendChild(div);
    div.addEventListener("drag",(e) => {
        dragElement = div;

    })

    return div;

}



if (localStorage.getItem("tasks")) {
  const data = JSON.parse(localStorage.getItem("tasks"));
  for (const col in data) {
    const column = document.querySelector(`#${col}`);
    data[col].forEach((task) =>{
        addTaskEle(task.title,task.desc,column);
  });

    const tasks = column.querySelectorAll(".task");
    const count = column.querySelector(".right");
    count.innerText = tasks.length;

  }
}

tasks.forEach((task) => {
  task.addEventListener("drag", (e) => {
    // console.log("dragging",e);
    dragElement = task;
  });
});

function addDragEventsOnColumn(column) {
  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    column.classList.add("hover-over");
  });
  column.addEventListener("dragleave", (e) => {
    e.preventDefault();
    column.classList.remove("hover-over");
  });

  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  column.addEventListener("drop", (e) => {
    //    console.log("onDrag",e);
    //    console.log("dropped",dragElement,column);
    column.appendChild(dragElement);
    column.classList.remove("hover-over");

    [todo, progress, done].forEach((col) => {
      const tasks = col.querySelectorAll(".task");
      const count = col.querySelector(".right");

      tasksData[col.id] = Array.from(tasks).map((t) => {
        return {
          title: t.querySelector("h2").innerText,
          desc: t.querySelector("p").innerText,
        };
      });
      localStorage.setItem("tasks", JSON.stringify(tasksData));
      count.innerText = tasks.length;
    });
  });
}

addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);
addDragEventsOnColumn(todo);

//now i want to make the add new Task Button functional

toggelModal.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.toggle("active");
});

bgModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

addTaskButton.addEventListener("click", () => {
  const taskTitle = document.querySelector("#task-title-input").value;
  const taskDesc = document.querySelector("#task-description-input").value;
    addTaskEle(taskTitle,taskDesc,todo);

  [todo, progress, done].forEach((col) => {
    const tasks = col.querySelectorAll(".task");
    const count = col.querySelector(".right");

    tasksData[col.id] = Array.from(tasks).map((t) => {
      return {
        title: t.querySelector("h2").innerText,
        desc: t.querySelector("p").innerText,
      };
    });
    localStorage.setItem("tasks", JSON.stringify(tasksData));
    count.innerText = tasks.length;
  });

  div.addEventListener("drag", (e) => {
    dragElement = div;
  });

  modal.classList.remove("active");
});

const removeTask = document.querySelector(".task button");

removeTask.addEventListener("click", (e) => {
  console.log(e);
});
