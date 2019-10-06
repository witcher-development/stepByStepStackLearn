import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react';

import style from './List.module.scss';
import { TodoStoreContext } from '@/Store';
import Item from '@/components/Item';

const Index = observer(() => {
	const state = useContext(TodoStoreContext);

	useEffect(() => {
		window.console.log('fired in component', state.todoList);
	}, [state.todoList]);

	return (
		<ul className={style.list}>
			{state.todoList.map((task) => (
				<Item key={task.id} task={task} />
			))}
		</ul>
	);
});

export default Index;
