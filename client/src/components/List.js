import React, { useContext } from 'react';
import { observer } from 'mobx-react';

import style from './test.module.scss';
import TodoStoreContext from '../Store';

const List = observer(() => {
	const state = useContext(TodoStoreContext);

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

export default List;
