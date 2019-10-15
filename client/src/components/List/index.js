import React, { useContext } from 'react';
import { observer } from 'mobx-react';

import style from './List.module.scss';
import storeContext from '@/Store';
import Item from '@/components/Item';

const Index = observer(() => {
	const { TodoStore, AuthStore } = useContext(storeContext);

	let list = [];

	if (AuthStore.access === 'low') {
		list = TodoStore.todoList.filter(t => t.access !== 'high').map((task) => (
			<Item key={task.id} task={task} />
		))
	} else {
		list = TodoStore.todoList.map((task) => (
			<Item key={task.id} task={task} />
		))
	}

	return (
		<ul className={style.list}>
			{ list }
		</ul>
	);
});

export default Index;
