import React, { useContext } from 'react';
import { observer } from 'mobx-react';

import style from './List.module.scss';
import storeContext from '@/Store';
import Item from '@/components/Item';

const Index = observer(() => {
	const store = useContext(storeContext);

	return (
		<ul className={style.list}>
			{store.TodoStore.todoList.map((task) => (
				<Item key={task.id} task={task} />
			))}
		</ul>
	);
});

export default Index;
