import React from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import Login from './components/Login';
import Chat from './components/Chat';

const App = () => {
	return (
		<div className="App">
			<Router>
				<div>
					<Redirect exact from="/" to="/chat" />
					<Route path="/login" component={Login} />
					<PrivateRoute path="/chat" component={Chat} />
				</div>
			</Router>
		</div>
	);
};

export default App;
