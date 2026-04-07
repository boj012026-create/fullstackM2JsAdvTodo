const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const listContainer = document.getElementById("list-container");

console.log(`
    taskForm: ${taskForm}
    taskInput: ${taskInput}
    listContainer: ${listContainer}
    `);

let tasks = [];

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
    renderPage();
});

function buildPage(taskArr) {
    listContainer.replaceChildren();
    taskArr.forEach( task => {
	const taskContainer = document.createElement('div');
	
	const taskName = document.createElement('p');
	taskName.textContent = task.task;
	if(task.complete) {
	    taskContainer.classList.add("checked");
	} else {
	    taskContainer.classList.remove("checked");

	}

	taskContainer.append(completeTaskInput(task));
	taskContainer.append(taskName);
	taskContainer.append(taskEditBtn(task));
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
	renderPage();
    });
    
    return inputElement;
}

function taskEditBtn(task) {
    const editBtn = document.createElement('button');
    editBtn.textContent = "edit";

    editBtn.addEventListener("click", e => {
	task.task = prompt("edit", task.task);
	renderPage();
    });
    return editBtn;
}

function taskDeleteBtn(task) {
    const delBtn = document.createElement('button');
    delBtn.textContent = "delete";

    delBtn.addEventListener('click', e => {
	let index = tasks.indexOf(task);
	tasks.splice(index, 1);
	renderPage();
    });
    return delBtn;
}

function renderPage() {
    buildPage(tasks)
};
