const initialState = {
	taskList: [],
	loading: true,
	theme: 'light'
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_THEME': {
			return {
				...state,
				theme: action.theme,
			};
		}
		case 'SET_TASKS': {
			return {
				...state,
				taskList: action.tasks,
				loading: false,
			};
		}
		case 'ADD_TASKS': {
			return {
				...state,
				taskList: [...state.taskList, action.task],
			};
		}
		case 'UPDATE_TASKS': {
			const task = action.tasks;

			const index = state.taskList.findIndex(t => t.id === task.id);

			return {
				...state,
				taskList: Object.assign([...state.taskList], { [index]: task }),
			};
		}
		case 'DELETE_TASKS': {
			return {
				...state,
				taskList: state.taskList.filter(t => t.id !== action.id),
			};
		}
		default: {
			return state;
		}
	}
};
