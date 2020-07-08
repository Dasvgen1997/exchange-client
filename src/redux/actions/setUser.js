import axios from 'axios';
import config from './../../config.js';

export default function setUser() {
	return (dispatch) => {
		let token = localStorage.getItem('token');
		if (!token) return;

		axios
			.get(`${config.server}/profile`, { headers: { Authorization: `Bearer ${token}` } })
			.then(function(response) {
				// handle success
				const user = response.data.user

				dispatch({type: 'SET_USER', payload: user})
			})
			.catch(function(error) {
				// handle error
				console.log(error);
			});
	};
}
