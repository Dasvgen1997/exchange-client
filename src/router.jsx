import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './pages/signin/signin.jsx';
import SignUp from './pages/signup/signup.jsx';
import Profile from './pages/profile/porfile.jsx';
import Change from './pages/change/change.jsx';
import Transactions from './pages/transactions/transactions.jsx';

export default function Router({ user }) {
	if (user) {
		return (
			<Switch>
				<Route component={Profile} path="/profile" />
				<Route component={Change} path="/exchange" />
				<Route component={Transactions} path="/transactions" />
				<Redirect to="/profile" />
			</Switch>
		);
	} else {
		return (
			<Switch>
				<Route component={SignIn} path="/signin" />
				<Route component={SignUp} path="/signup" />
				<Redirect to="/signin" />
			</Switch>
		);
	}

	
}
