const initialState = {
	taskList: [],
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
		default: {
			return state;
		}
	}
};

export const setTheme = theme => ({
	type: 'SET_THEME',
	theme,
});
