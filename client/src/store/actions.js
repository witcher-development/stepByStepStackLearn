export const setTheme = theme => ({
	type: 'SET_THEME',
	theme,
});

export const setTasks = tasks => ({
	type: 'SET_TASKS',
	tasks,
});

export const addTask = task => ({
	type: 'ADD_TASK',
	task,
});

export const updateTask = task => ({
	type: 'UPDATE_TASK',
	task,
});

export const deleteTask = id => ({
	type: 'DELETE_TASK',
	id,
});
