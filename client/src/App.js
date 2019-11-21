import React from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { useStore } from 'effector-react';

import PrivateRoute from './components/PrivateRoute';
import { $isStoreReady } from './store';

import Login from './components/Login';
import Chat from './components/Chat';

const App = () => {
	const isStoreReady = useStore($isStoreReady);

	return (
		<div className="App">
			{isStoreReady ? (
				<Router>
					<Redirect exact from="/" to="/chat" />
					<Route path="/login" component={Login} />
					<PrivateRoute path="/chat" component={Chat} />
				</Router>
			) : (
				<></>
			)}
		</div>
	);
};

export default App;
