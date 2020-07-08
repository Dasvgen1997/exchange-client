import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import Select from './select.jsx';
import axios from 'axios';
import config from './../../config.js';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '0px auto'
	},
	paper: {
		padding: '15px'
	},
	title: {
		fontSize: '30px'
	},
	currencyListItem: {
		fontSize: '20px',
		color: '#2b2b51',
		fontFamily: 'Arial',
		'& span': {
			margin: '3px'
		}
	},
	selectPanel: {
		'&>*': {
			width: '50%'
		}
	},
	result: {
		fontSize: '20px',
		margin: '10px 10px 10px 0px'
	}
}));

function Change() {
	let [ currentRate, setCurrentRate ] = useState([]);

	let [ userWallet, setUserWallet ] = useState([]);

	let [ sentValute, setSentValute ] = useState({ valute: 'USD', amount: '0' });

	let [ receiveValute, setReceiveValute ] = useState({ valute: 'USD', amount: '0'});

	let [ alert, setAlert ] = useState(null);

	const classes = useStyles();
	useEffect(() => {
		let token = localStorage.getItem('token');
		if (!token) return;

		axios
			.get(`${config.server}/exchange`, { headers: { Authorization: `Bearer ${token}` } })
			.then(function(response) {
				setCurrentRate(response.data.valute);
				setUserWallet(response.data.wallet);
				setSentValute({ valute: response.data.wallet[0].valute , amount: '0'});
				setReceiveValute({valute: response.data.valute[0].valute, amount: '0'});
			})
			.catch(function(error) {
				// handle error
				console.log(error);
			});
	}, []);

	function currentRateList(list) {
		return list.map((item, i) => {
			return (
				<Box className={classes.currencyListItem} p={1}>
					<span>{item.valute}</span>
					<span>{item.price}</span>
				</Box>
			);
		});
	}

	function submitHandler(e) {
		e.preventDefault();
		if (sentValute.valute == receiveValute.valute) {
			setAlert({
				message: 'Нельзя обменять одну и ту же валюту!',
				type: 'error'
			});
			return;
		}
		if (receiveValute.amount < 1) {
			setAlert({
				message: 'Нехватает валюты для обмена!',
				type: 'error'
			});
			return;
		}

		let sentId;

		for (let p = 0; p < userWallet.length; p++) {
			let valute = userWallet[p];
			if (valute.valute == sentValute.valute) {
				sentId = valute._id;
			}
		}
	
		let data = {
			received: receiveValute.valute,
			amount: receiveValute.amount,
			sent: sentId
		}

		console.log(data);
		let token = localStorage.getItem('token');
		if (!token) return;
		axios
			.post(`${config.server}/exchange`, data, { headers: { Authorization: `Bearer ${token}` } })
			.then(function(response) {
				setAlert({
					message: 'Обмен произведён!',
					type: 'success'
				});
			})
			.catch(function(error) {
				// handle error
				console.log(error);
			});
	}

	return (
		<Grid xs={12} sm={6} md={5} className={classes.root}>
			<Helmet>
				<title>Обменять валюту</title>
			</Helmet>
			<Paper className={classes.paper} square elevation={3}>
				<Typography gutterBottom align="center" variant="h2" className={classes.title}>
					Обменять валюту
				</Typography>
				{alert ? (
					<Alert severity={alert.type} onClose={() => setAlert(null)}>
						{alert.message}
					</Alert>
				) : null}

				<Box display="flex" flexWrap="wrap" flexDirection="row" p={1} m={1}>
					{currentRate ? currentRateList(currentRate) : null}
				</Box>
				{currentRate ? (
					<Select
						submitHandler={submitHandler}
						sentValute={sentValute}
						setSentValute={setSentValute}
						receiveValute={receiveValute}
						setReceiveValute={setReceiveValute}
						userWallet={userWallet}
						currentRate={currentRate}
					/>
				) : null}
			</Paper>
		</Grid>
	);
}

export default Change;
