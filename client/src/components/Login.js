import React from 'react';

import { auth } from '../store';

const Login = ({ history }) => {
	const onClick = () => {
		auth();

		history.push('/chat');
	};

	return (
		<div>
			<button onClick={onClick}>login</button>
		</div>
	);
};

export default Login;
