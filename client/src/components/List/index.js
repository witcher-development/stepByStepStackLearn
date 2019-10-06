import React, { useContext } from 'react';
import { observer } from 'mobx-react';

import style from './List.module.scss';
import { TodoStoreContext } from '@/Store';

const Index = observer(() => {
	const state = useContext(TodoStoreContext);

	window.console.log(state.todoList);

	return (
		<ul>
			{state.todoList.map((task, i) => (
				<li key={i} className={style.item}>
					{task}
				</li>
			))}
		</ul>
	);
});

export default Index;
