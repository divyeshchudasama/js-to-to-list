window.onload = loadFromLocalStorage;
let taskList = [];

function loadFromLocalStorage() {
  let storedTasks = localStorage.getItem("my-tasks");
  if (storedTasks) {
    taskList = JSON.parse(storedTasks);
    updateUi();
  } else {
    taskList = [];
  }
}

const addTaskHandler = () => {
  // get input element
  const input = document.getElementById("to-do-input");
  const inputText = input.value.trim();
  // Check if task is already present
  let duplicate = taskList?.some(
    (task) => task.task.toLowerCase() === inputText.toLowerCase()
  );

  if (duplicate) {
    alert("Task is already exist.");
    return;
  }

  if (inputText && !duplicate) {
    // add input value to array
    taskList.unshift({
      task: inputText,
      completed: false,
    });

    //clear the input after adding
    input.value = "";

    // store data to localstorage
    localStorage.setItem("my-tasks", JSON.stringify(taskList));

    // scrollDiv();

    // update ui
    updateUi();
  }
};

document.getElementById("to-do-input").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addTaskHandler();
  }
});

// const scrollDiv = () => {
//   let div = document.querySelector(".task-list-container");
//   setTimeout(() => {
//     div.scrollTo({ top: div.scrollHeight, behavior: "smooth" });
//   }, 100); // Delay ensures new content is rendered before scrolling
// };
const updateUi = () => {
  // get task-list element
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  // adding li element with buttons
  taskList.forEach((task, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
         <div class="list-row">
            <p class=${task.completed ? "completed" : ""}>${task.task}</p>
            <div class="action-button">
                <button type="button" class="complete-button" onclick="completeTaskHandler(${index})">${
      task.completed ? "Completed" : "Complete"
    }</button>
                <button type="button" class="delete-button" onclick="deleteTaskHandler(${index})">Delete</button>
            </div>
            
        </div>
         `;
    list.appendChild(li);
  });
};

const completeTaskHandler = (index) => {
  taskList[index].completed = !taskList[index].completed;
  localStorage.setItem("my-tasks", JSON.stringify(taskList));
  updateUi();
};

const deleteTaskHandler = (index) => {
  taskList.splice(index, 1);
  localStorage.setItem("my-tasks", JSON.stringify(taskList));

  updateUi();
};
