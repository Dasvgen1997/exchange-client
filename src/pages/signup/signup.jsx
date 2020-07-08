import React, { useState } from 'react';
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

function SignUp() {
	const classes = useStyles();

	let [ alert, setAlert ] = useState(null);

	let [ name, setName ] = useState('');
	let [ email, setEmail ] = useState('');
	let [ password, setPassword ] = useState('');

	function submitHandler(e) {
		e.preventDefault();

		axios
			.post( `${config.server}/signup`  ,{
				name,
				email,
				password
			})
			.then(function(response) {
				setAlert({
					type: 'success',
					message: response.data.message
				});
			})
			.catch(function(error) {
				setAlert({
					type: 'error',
					message: error.response.data.message
				});
			});
	}

	return (
		<Grid xs={12} sm={6} md={5} className={classes.root}>
			<Helmet>
				<title>Регистрация</title>
			</Helmet>
			<Paper className={classes.paper} square elevation={3}>
				<Typography gutterBottom align="center" variant="h2" className={classes.title}>
					Регистрация
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
						autoFocus
						fullWidth
						type="text"
						margin="normal"
						name="name"
						id="name"
						label="Введите имя"
						variant="filled"
						value={name}
						onChange={(e) => setName(e.target.value)}
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
						Зарегестрироваться
					</Button>
					<Button to="/signin" component={Link} fullWidth>
						Уже есть аккаунт? Войти
					</Button>
				</form>
			</Paper>
		</Grid>
	)
}

export default SignUp;
