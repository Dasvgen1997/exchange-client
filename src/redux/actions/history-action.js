import axios from 'axios';
import config from './../../config.js';

export default function loadHistory() {
	return (dispatch) => {
		let token = localStorage.getItem('token');
		if (!token) return;

		axios
			.get(`${config.server}/transactions`, { headers: { Authorization: `Bearer ${token}` } })
			.then(function(response) {
				dispatch({ type: 'SET_HISTORY', payload: response.data });
			})
			.catch(function(error) {
				// handle error
				console.log(error);
			});
	};
}
