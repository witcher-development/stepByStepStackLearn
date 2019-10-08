import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react';

import { Get } from '@/API';
import storeContext from '@/Store';
import List from '@/components/List';

const App = observer(() => {
	const { TodoStore } = useContext(storeContext);

	useEffect(() => {
		const getData = async () => {
			const data = await Get();
			TodoStore.setTodoList(data.data);
		};

		getData();
	}, []);

	return (
		<div className="App">
			<List />
		</div>
	);
});

export default App;
