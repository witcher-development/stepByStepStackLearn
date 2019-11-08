import React from 'react';
import { createStore } from '@reatom/core';
import { context } from '@reatom/react';

import List from './components/List';

const App = () => {
	const store = createStore();

	return (
		<div className="App">
			<context.Provider value={store}>
				<List />
			</context.Provider>
		</div>
	);
};

export default App;
