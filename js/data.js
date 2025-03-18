export let taskList = JSON.parse(localStorage.getItem("taskList")) ?? [];

export function getCurrentTasks() {
	const currentTasks = taskList.filter((item) => !item.completed && !item.deleted);
	return currentTasks;
}

export function getCompletedTasks() {
	const completedTasks = taskList.filter((item) => item.completed);

	return completedTasks;
}

export function getDeletedTasks() {
	const deletedTasks = taskList.filter((item) => item.deleted);

	return deletedTasks;
}
