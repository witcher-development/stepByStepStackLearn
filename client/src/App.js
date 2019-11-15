import React from 'react';
import { createStore } from '@reatom/core';
import { context } from '@reatom/react';

import Header from './components/Header';
import Board from './components/Board';

const App = () => {
	const store = createStore();

	return (
		<div className="App">
			<context.Provider value={store}>
				<Header />
				<Board />
			</context.Provider>
		</div>
	);
};

export default App;
