import React, { useContext, useEffect } from 'react';

import { Get } from '@/API';
import { TodoStoreContext } from '@/Store';
import List from '@/components/List';

function App() {
	const todoStore = useContext(TodoStoreContext);

	useEffect(() => {
		console.log('called in container')
		todoStore.todoList.push({name: 'element', id: 1});

		// const todoList = await Get();
		// window.console.log(todoList);
		// todoStore.setTodoList(todoList.data);
	}, []);

	return (
		<div className="App">
			<List />
		</div>
	);
}

export default App;
