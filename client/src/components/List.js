import React, { useContext } from 'react';
import { observer } from 'mobx-react';

import TodoStoreContext from '../Store';

const List = observer(() => {
	const state = useContext(TodoStoreContext);

	return (
		<ul>
			<li>state.todoList</li>
		</ul>
	);
});

export default List;
