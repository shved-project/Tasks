import {taskList, getCurrentTasks} from "./data.js";
import renderTasks from "./renderTasks.js";
import {openModal, generateHTMLMessageModal} from "./modal.js";

export default function taskManagement() {
	const taskElem = document.querySelector(".task");
	taskElem.addEventListener("click", (event) => {
		const target = event.target;

		if (!target.closest(".task__cart")) {
			return;
		}

		const indexCurrentTask = target.closest(".task__cart").getAttribute("data-index-task");

		const indexTaskForClose = taskList.findIndex((item) => {
			return item.name === getCurrentTasks()[indexCurrentTask].name && !item.completed && !item.deleted;
		});
		const taskForClose = taskList[indexTaskForClose];

		if (target.closest("[data-complete-task]")) {
			openModal(generateHTMLMessageModal("./icons/checkmark.svg", `Задача "${taskForClose.name}" выполнена`));

			taskForClose.completed = true;
			localStorage.setItem("taskList", JSON.stringify(taskList));

			renderTasks();
		}

		if (target.closest("[data-delete-task]")) {
			openModal(generateHTMLMessageModal("./icons/basket.svg", `Задача "${taskForClose.name}" удалена`));

			taskForClose.deleted = true;
			localStorage.setItem("taskList", JSON.stringify(taskList));

			renderTasks();
		}

		if (target.closest("[data-edit-task]")) {
			editTask();
		}

		const taskNameElem = target.closest(".task__name");
		if (taskNameElem) {
			taskNameElem.addEventListener("dblclick", () => editTask());
		}

		function editTask() {
			const deleteTaskForm = `
			<form class="modal__task" name="taskForm">
				<label class="modal__task-label" for="nameForTask">Редактировать задачу</label>
				<textarea
					class="modal__task-textarea"
					name="nameForTask"
					id="name-for-task"
					placeholder="Купить хлеб..."
				></textarea>
				<button class="modal__task-button" type="submit">Сохранить</button>
			</form>
		`;
			openModal(deleteTaskForm, null, () => {
				const taskForm = document.forms.taskForm;
				const textareaNameTask = taskForm.elements.nameForTask;

				textareaNameTask.value = taskForClose.name;
				textareaNameTask.focus();

				taskForm.addEventListener("submit", (event) => {
					event.preventDefault();

					if (!textareaNameTask.value) {
						openModal(generateHTMLMessageModal("./icons/NotCompleted.svg", "Задача не может быть пустой!"));
						return;
					}

					taskForClose.name = textareaNameTask.value;
					renderTasks();
					openModal(generateHTMLMessageModal("./icons/checkmark.svg", "Задача отредактирована!"));
				});

				textareaNameTask.addEventListener("keydown", (event) => {
					if (event.key === "Enter") {
						const modalAddTaskButton = document.querySelector(".modal__task-button");
						modalAddTaskButton.click();
					}
				});
			});
		}
	});
}
