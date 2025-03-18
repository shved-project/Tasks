import {getCurrentTasks} from "./data.js";

const taskElem = document.querySelector(".task");

export default function renderTasks() {
	if (getCurrentTasks().length === 0) {
		taskElem.innerHTML = '<p class="task__empty">Список задач пока пуст...</p>';
	} else {
		taskElem.innerHTML = `
            <h2 class="task__title">Список задач:</h2>
			<div class="task__wrapper"></div>
        `;

		const taskWrapper = document.querySelector(".task__wrapper");
		const taskListHTML = getCurrentTasks().reduce((acc, item, index) => {
			const itemToHTML = `
				<article class="task__cart" data-index-task="${index}">
					<p class="task__name" title="Нажмите дважды для редактирования">${item.name}</p>
					<div class="task__buttons">
						<button class="task__button" type="button" title="Задача выполнена" data-complete-task>
							<img src="icons/checkmark.svg" alt="Задача выполнена" width="15" />
						</button>
						<button class="task__button" type="button" title="Редактировать задачу" data-edit-task>
							<img src="icons/edit-pencil.svg" alt="Редактировать задачу" width="15" />
						</button>
						<button class="task__button" type="button" title="Удалить задачу" data-delete-task>
							<img src="icons/basket.svg" alt="Удалить задачу" width="15" />
						</button>
					</div>
				</article>
            `;

			return acc + itemToHTML;
		}, "");

		taskWrapper.innerHTML = taskListHTML;
	}
}
