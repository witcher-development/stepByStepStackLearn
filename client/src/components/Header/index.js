import React, { useContext } from 'react';
import { observer } from 'mobx-react';

import style from './Header.module.scss';
import storeContext from '@/Store';

const Header = observer(() => {
	const { TodoStore, AuthStore } = useContext(storeContext);

	return (
		<div className={style.header}>
			<span className={style.count}>
				count:
				{ TodoStore.taskCount }
			</span>
			<button className={style.login} onClick={() => AuthStore.login()}>
				Login
			</button>
		</div>
	);
});

export default Header;
