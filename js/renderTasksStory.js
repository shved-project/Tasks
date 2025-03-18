import {getCompletedTasks, getDeletedTasks} from "./data.js";
import {openModal} from "./modal.js";

export default function renderTasksStory() {
	const headerTaskStoryButton = document.querySelector(".header__task-story");

	const taskStoryHTML = `
        <div class="story__wrapper-tasks">
            <p class="story__title">Выполненные задачи:</p>
            <ul class="story__list story__list-completed">
            </ul>
        </div>
        <div class="story__wrapper-tasks">
            <p class="story__title">Удалённые задачи:</p>
            <ul class="story__list story__list-deleted">
            </ul>
        </div>
    `;

	openModal(taskStoryHTML, headerTaskStoryButton, () => {
		const storyListCompleted = document.querySelector(".story__list-completed");
		const storyListDeleted = document.querySelector(".story__list-deleted");

		if (getCompletedTasks().length === 0) {
			storyListCompleted.outerHTML = '<p class="story__empty-text">Выполненных задач пока нет...</p>';
		} else {
			const storyListCompletedHTML = getCompletedTasks().reduce((acc, item) => {
				const itemToHTML = `<li class="story__list-item">${item.name}</li>`;

				return acc + itemToHTML;
			}, "");

			storyListCompleted.innerHTML = storyListCompletedHTML;
		}
		if (getDeletedTasks().length === 0) {
			storyListDeleted.outerHTML = '<p class="story__empty-text">Удалённых задач пока нет...</p>';
		} else {
			const storyListDeletedHTML = getDeletedTasks().reduce((acc, item) => {
				const itemToHTML = `<li class="story__list-item">${item.name}</li>`;

				return acc + itemToHTML;
			}, "");

			storyListDeleted.innerHTML = storyListDeletedHTML;
		}
	});
}
