import React from 'react';
import { useStore } from 'effector-react';

import style from './Login.module.scss';
import { login, $users, $userId, setId } from '../store';

const Login = ({ history }) => {
	const users = useStore($users);
	const userId = useStore($userId);

	const onClick = () => {
		if (!userId) return;
		login();
		history.push('/chat');
	};

	return (
		<div className={style.login}>
			<ul className={style.login__users}>
				{users.map(({ id, name, color }) => (
					<li key={id} className={style.login__user}>
						<div
							className={style['login__user-avatar']}
							style={{ backgroundColor: color }}
						></div>
						<p className={style['login__user-name']}>{name}</p>
						<input
							type="radio"
							name="user"
							checked={id === userId}
							onChange={() => setId(id)}
						/>
					</li>
				))}
			</ul>

			<button className={style.login__btn} onClick={onClick}>
				login
			</button>
		</div>
	);
};

export default Login;
