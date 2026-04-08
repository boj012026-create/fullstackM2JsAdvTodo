const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const listContainer = document.getElementById("list-container");
const showCompleted = document.getElementById("show-completed");

console.log(`
    taskForm: ${taskForm}
    taskInput: ${taskInput}
    listContainer: ${listContainer}
    `);

let filters = {showCompleted: false};

let tasks = [];

showCompleted.addEventListener('change', e => {
   filters.showCompleted = e.target.checked;
   renderPage(); 
});

taskForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(taskForm);
    const userInput = formData.get('task-input');//name
    
    //validate user input
    if (!userInput) {
	return alert("User input cannot be empty");
    }

    tasks.push({
	timestamp: new Date(),
	task: userInput,
	complete: false
    });
    taskInput.value = "";
    saveTasksToStorage();
    renderPage();
});

function buildPage(taskArr) {
    listContainer.replaceChildren();//clear page
    taskArr.forEach( task => {
	const taskContainer = document.createElement('div');
	
	const taskName = document.createElement('input');
	taskName.classList.add('edit-button');
	taskName.readOnly = true;
	taskName.value = task.task;
	
	if(task.complete) {
	    taskContainer.classList.add("checked");
	} else {
	    taskContainer.classList.remove("checked");
	}

	taskContainer.append(completeTaskInput(task));
	taskContainer.append(taskName);
	taskContainer.append(taskEditBtn(task, taskName));
	taskContainer.append(taskDeleteBtn(task));
	

	//Ensure tasks appear on the website
	listContainer.append(taskContainer);
    })
};

function completeTaskInput(task) {
    const inputElement = document.createElement('input');
    inputElement.type = "checkbox";
    inputElement.checked = task.complete;
    
    inputElement.addEventListener('change', e => {
	task.complete = e.target.checked;
	saveTasksToStorage();
	renderPage();
    });
    
    return inputElement;
}

function taskEditBtn(task, taskName) {
    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", () => {
	taskName.readOnly = !taskName.readOnly;
	editBtn.textContent = taskName.readOnly ? "Edit": "Save";
	task.task = taskName.value;
	saveTasksToStorage();
    });
    return editBtn;
}

function taskDeleteBtn(task) {
    const delBtn = document.createElement('button');
    delBtn.textContent = "delete";

    delBtn.addEventListener('click', () => {
	let index = tasks.indexOf(task);
	if (0 <= index) { 
	    tasks.splice(index, 1);
	}
	saveTasksToStorage();
	renderPage();
    });
    return delBtn;
}

function filterTaskArr(taskArr) {
    return taskArr.filter(task => filters.showCompleted || !task.complete)
}

function saveTasksToStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderPage() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
	tasks = storedTasks;
    }
    buildPage(filterTaskArr(tasks));
    //localStorage.setItem("tasks", JSON.stringify(tasks));
};

renderPage();
