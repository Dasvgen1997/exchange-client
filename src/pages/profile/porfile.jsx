import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';

import { loadProfile, addMoney } from './../../redux/actions/profile-action.js';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '0px auto'
	},
	paper: {
		margin: '10px',
		padding: '15px'
	},
	title: {
		fontSize: '30px'
	},
	email: {
		fontSize: '25px'
	},
	name: {
		fontSize: '20px'
	},
	list: {
		maxWidth: 'max-content',
		margin: '0px auto',
		fontSize: '20px',
		color: '#2b2b51',
		fontFamily: 'Arial',
		'& span': {
			marginRight: '7px'
		}
	}
}));

function Profile({ user, wallet, loadProfile, addMoney }) {
	let [ alert, setAlert ] = useState(null);

	const classes = useStyles();
	useEffect(() => {
		loadProfile();
	}, []);

	console.log(wallet);
	return (
		<Grid xs={12} sm={6} md={5} className={classes.root}>
			<Helmet>
				<title>Мой профиль</title>
			</Helmet>
			<Paper className={classes.paper} square elevation={3}>
				<Typography gutterBottom align="center" variant="h2" className={classes.title}>
					Мой профиль
				</Typography>

				{alert ? (
					<Alert severity={alert.type} onClose={() => setAlert(null)}>
						{alert.message}
					</Alert>
				) : null}
				<Typography gutterBottom align="center" variant="subtitle1" className={classes.email}>
					{user.email}
				</Typography>

				<Typography gutterBottom align="center" variant="subtitle2" className={classes.name}>
					{user.name}
				</Typography>

				<div className={classes.list}>
					{wallet.map((item) => {
						return (
							<p>
								<span>{item.valute}</span>
								<span>{item.amount}</span>
								<Button
									onClick={() => addMoney(item._id, setAlert)}
									variant="outlined"
									color="secondary"
								>
									+ 100
								</Button>
							</p>
						);
					})}
				</div>
			</Paper>
		</Grid>
	);
}

function mapStateProps(state) {
	console.log(state);
	return {
		user: state.user,
		wallet: state.wallet
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loadProfile: () => dispatch(loadProfile()),
		addMoney: (amount, setAlert) => dispatch(addMoney(amount, setAlert))
	};
}

export default connect(mapStateProps, mapDispatchToProps)(Profile);
