import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStore } from 'effector-react';

import { $isAuth } from '../store';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const isAuth = useStore($isAuth);

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuth === true ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
};

export default PrivateRoute;
