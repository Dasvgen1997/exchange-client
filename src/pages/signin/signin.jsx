import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import axios from 'axios';

import setUser from './../../redux/actions/setUser.js';

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
	}
}));

function SignIn({ setUser }) {
	const classes = useStyles();

	let [ alert, setAlert ] = useState(null);

	let [ email, setEmail ] = useState('');
	let [ password, setPassword ] = useState('');

	async function submitHandler(e) {

		e.preventDefault();
	await	axios
			.post(`${config.server}/signin`, {
				email,
				password
			})
			.then(function(response) {
				let token = response.data.token;
				localStorage.setItem('token', token);
			})
			.catch(function(error) {
				console.log(error.response);
				setAlert({
					type: 'error',
					message: error.response.data.message
				});
			});

			setUser()
	}

	return (
		<Grid xs={12} sm={6} md={5} className={classes.root}>
			<Helmet>
				<title>Авторизация</title>
			</Helmet>
			<Paper className={classes.paper} square elevation={3}>
				<Typography gutterBottom align="center" variant="h2" className={classes.title}>
					Авторизация
				</Typography>
				{alert ? (
					<Alert severity={alert.type} onClose={() => setAlert(null)}>
						{alert.message}
					</Alert>
				) : null}

				<form onSubmit={submitHandler}>
					<TextField
						required
						autoComplete
						autoFocus
						fullWidth
						type="email"
						margin="normal"
						name="email"
						id="email"
						label="Введите email"
						variant="filled"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<TextField
						required
						autoComplete
						fullWidth
						type="password"
						margin="normal"
						name="password"
						id="password"
						label="Введите пароль"
						variant="filled"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<Button type="submit" size="large" fullWidth variant="contained" color="primary">
						Войти
					</Button>
					<Button to="/signup" component={Link} fullWidth>
						Ещё нет аккаунта? Создать
					</Button>
				</form>
			</Paper>
		</Grid>
	);
}

function mapDispatchToProps(dispatch) {
	return {
		setUser: () => dispatch(setUser())
	};
}

export default connect(null, mapDispatchToProps)(SignIn);
