import {taskList, getCurrentTasks} from "./data.js";
import renderTasks from "./renderTasks.js";
import {openModal, generateHTMLMessageModal} from "./modal.js";

export default function addTask() {
	const taskForm = document.forms.taskForm;
	const textareaNameTask = taskForm.elements.nameForTask;

	textareaNameTask.focus();

	taskForm.addEventListener("submit", (event) => {
		event.preventDefault();

		const newTask = {
			name: textareaNameTask.value,
			completed: false,
			deleted: false,
		};

		if (!newTask.name) {
			openModal(generateHTMLMessageModal("./icons/NotCompleted.svg", "Задача не может быть пустой!"));
			return;
		}

		if (getCurrentTasks().length !== 0) {
			const currentTaskNames = getCurrentTasks().map((item) => item.name.toLowerCase());

			if (currentTaskNames.includes(newTask.name.toLowerCase())) {
				openModal(generateHTMLMessageModal("./icons/NotCompleted.svg", "Такая задача уже существует!"));
			} else {
				taskList.push(newTask);
				localStorage.setItem("taskList", JSON.stringify(taskList));
				renderTasks();
				openModal(generateHTMLMessageModal("./icons/completed.svg", "Задача добавлена!"));
			}
		} else {
			taskList.push(newTask);
			localStorage.setItem("taskList", JSON.stringify(taskList));
			renderTasks();
			openModal(generateHTMLMessageModal("./icons/completed.svg", "Задача добавлена!"));
		}
	});

	textareaNameTask.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			const modalTaskButton = document.querySelector(".modal__task-button");
			modalTaskButton.click();
		}
	});
}
