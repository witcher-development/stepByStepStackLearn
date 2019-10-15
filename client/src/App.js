import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react';

import { Get } from '@/API';
import storeContext from '@/Store';
import Header from '@/components/Header';
import List from '@/components/List';

const App = observer(() => {
	const { TodoStore } = useContext(storeContext);

	useEffect(() => {
		const getData = async () => {
			const data = await Get();

			data.data[2].access = 'high';

			TodoStore.setTodoList(data.data);
		};

		getData();
	}, []);

	const addTodo = () => {
		TodoStore.addTodo({
			id: '123',
			name: 'new task',
		})
	};

	return (
		<div className="App">
			<Header />
			<List />
			<button onClick={addTodo}>Add task</button>
		</div>
	);
});

export default App;
