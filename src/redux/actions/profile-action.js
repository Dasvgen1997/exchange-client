import axios from 'axios';
import config from './../../config.js';

export function loadProfile() {
	return (dispatch) => {
		let token = localStorage.getItem('token');
		if (!token) return;

		axios
			.get(`${config.server}/profile`, { headers: { Authorization: `Bearer ${token}` } })
			.then(function(response) {
				// handle success
				dispatch({ type: 'SET_USER', payload: response.data.user });
				dispatch({ type: 'SET_WALLET', payload: response.data.wallet });
			})
			.catch(function(error) {
				// handle error
				console.log(error);
			});
	};
}

export function addMoney(valuteId, setAlert) {
	return (dispatch) => {
		let token = localStorage.getItem('token');
		if (!token) return;

		axios
			.post(`${config.server}/profile`, { id: valuteId }, { headers: { Authorization: `Bearer ${token}` } })
			.then(function(response) {
				setAlert({
					message: 'Валюта добавлена!',
					type: 'success'
				});
			})
			.catch(function(error) {
				// handle error
				console.log(error);
			});
	};
}
