import {getCurrentTasks} from "./data.js";
import {taskList} from "./data.js";
import renderTasks from "./renderTasks.js";
import {openModal, generateHTMLMessageModal} from "./modal.js";

export function completeTaskByName() {
	const taskForm = document.forms.taskForm;
	const textareaNameTask = taskForm.elements.nameForTask;

	if (getCurrentTasks().length === 0) {
		openModal(generateHTMLMessageModal("./icons/notCompleted.svg", `У вас пока нет актуальных задач`));
		return;
	}

	textareaNameTask.focus();

	taskForm.addEventListener("submit", (event) => {
		event.preventDefault();

		const taskForCloseIndex = taskList.findIndex((item) => {
			return item.name.toLowerCase() === textareaNameTask.value.toLowerCase() && !item.completed && !item.deleted;
		});
		if (taskForCloseIndex >= 0) {
			const taskForClose = taskList[taskForCloseIndex];

			taskForClose.completed = true;
			localStorage.setItem("taskList", JSON.stringify(taskList));
			renderTasks();
			openModal(generateHTMLMessageModal("./icons/completed.svg", `Задача ${taskForClose.name} выполнена!`));
		} else {
			openModal(generateHTMLMessageModal("./icons/notCompleted.svg", `Такой задачи не существует`));
		}
	});

	textareaNameTask.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			const modalAddTaskButton = document.querySelector(".modal__task-button");
			modalAddTaskButton.click();
		}
	});
}

export function deleteTaskByName() {
	const taskForm = document.forms.taskForm;
	const textareaNameTask = taskForm.elements.nameForTask;

	if (getCurrentTasks().length === 0) {
		openModal(generateHTMLMessageModal("./icons/notCompleted.svg", `У вас пока нет актуальных задач`));
		return;
	}

	textareaNameTask.focus();

	taskForm.addEventListener("submit", (event) => {
		event.preventDefault();

		const taskForCloseIndex = taskList.findIndex((item) => {
			return item.name.toLowerCase() === textareaNameTask.value.toLowerCase() && !item.completed && !item.deleted;
		});
		if (taskForCloseIndex >= 0) {
			const taskForClose = taskList[taskForCloseIndex];

			taskForClose.deleted = true;
			localStorage.setItem("taskList", JSON.stringify(taskList));
			renderTasks();
			openModal(generateHTMLMessageModal("./icons/completed.svg", `Задача ${taskForClose.name} удалена!`));
		} else {
			openModal(generateHTMLMessageModal("./icons/notCompleted.svg", `Такой задачи не существует`));
		}
	});

	textareaNameTask.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			const modalAddTaskButton = document.querySelector(".modal__task-button");
			modalAddTaskButton.click();
		}
	});
}
