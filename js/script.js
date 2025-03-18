import renderTasks from "./renderTasks.js";
import {openModal} from "./modal.js";
import addTask from "./addTask.js";
import taskManagement from "./taskManagement.js";
import renderTasksStory from "./renderTasksStory.js";
import {completeTaskByName, deleteTaskByName} from "./manageTaskByName.js";

document.addEventListener("DOMContentLoaded", () => {
	renderTasks();

	const headerAddTaskButton = document.querySelector(".header__add-task");
	const addTaskForm = `
        <form class="modal__task" name="taskForm">
			<label class="modal__task-label" for="nameForTask">Добавить задачу</label>
			<textarea
				class="modal__task-textarea"
				name="nameForTask"
				id="name-for-task"
				placeholder="Купить хлеб..."
			></textarea>
			<button class="modal__task-button" type="submit">Добавить</button>
		</form>
    `;
	openModal(addTaskForm, headerAddTaskButton, addTask);

	const headerCompleteTaskButton = document.querySelector(".header__complete-task");
	const completeTaskForm = `
		<form class="modal__task" name="taskForm">
			<label class="modal__task-label" for="nameForTask">Выполнить задачу</label>
			<textarea
				class="modal__task-textarea"
				name="nameForTask"
				id="name-for-task"
				placeholder="Купить хлеб..."
			></textarea>
			<button class="modal__task-button" type="submit">Выполнить</button>
		</form>
	`;
	openModal(completeTaskForm, headerCompleteTaskButton, completeTaskByName);

	const headerDeleteTaskButton = document.querySelector(".header__delete-task");
	const deleteTaskForm = `
		<form class="modal__task" name="taskForm">
			<label class="modal__task-label" for="nameForTask">Удалить задачу</label>
			<textarea
				class="modal__task-textarea"
				name="nameForTask"
				id="name-for-task"
				placeholder="Купить хлеб..."
			></textarea>
			<button class="modal__task-button" type="submit">Удалить</button>
		</form>
	`;
	openModal(deleteTaskForm, headerDeleteTaskButton, deleteTaskByName);

	renderTasksStory();

	taskManagement();
});
