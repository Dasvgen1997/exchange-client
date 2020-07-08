import React,{useEffect} from 'react';
import './App.sass';
import { connect } from 'react-redux';

import MainHeader from './modules/main-header/main-header.jsx';
import Router from './router.jsx';
import setUser from './redux/actions/setUser.js';

function App({ user, logout, setUser }) {
	useEffect(()=>{
		setUser();
	},[])

	return (
		<div className="App">
			<MainHeader user={user} logout={logout} />
			<div className="main-container">
				<Router user={user} />
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		logout: () => dispatch({ type: 'LOGOUT_USER' }),
		setUser: () => dispatch(setUser())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
