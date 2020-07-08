import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	},
	authControls: {
		flexGrow: 1,
		display: 'flex',
		justifyContent: 'flex-end'
	},
	authLink: {
		marginLeft: '10px'
	}
}));

export default function MainHeader({user, logout}) {
	let [ userMenu, setUserMenu ] = useState(null);

	const classes = useStyles();

	function logOut(){
		logout();
		setUserMenu(null);
		localStorage.clear()
	}

	function unAuthUser() {
		return (
			<Fragment>
				<Button variant="contained" component={Link} to="/signup">
					Регистрация
				</Button>
				<Button className={classes.authLink} variant="contained" color="primary" component={Link} to="/signin">
					Войти
				</Button>
			</Fragment>
		);
	}

	function authUser() {
		return (
			<Fragment>
				<IconButton
					onClick={() => setUserMenu(true)}
					color="inherit"
				>
					<AccountCircle />
				</IconButton>

				<Menu
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					open={userMenu}
					onClose={() => setUserMenu(null)}
				>
					<MenuItem component={Link} to="/exchange" onClick={() => setUserMenu(null)}>
						Обменять
					</MenuItem>
					<MenuItem component={Link} to="/profile" onClick={() => setUserMenu(null)}>
						Профиль
					</MenuItem>
					<MenuItem component={Link} to="/transactions" onClick={() => setUserMenu(null)}>
						Транзакции
					</MenuItem>
					<MenuItem onClick={logOut}>Выйти</MenuItem>
				</Menu>

			</Fragment>
		);
	}

	return (
		<AppBar position="sticky">
			<Toolbar>
				<Typography variant="h6" className={classes.title}>
					Valute Exchange
				</Typography>
				<div className={classes.authControls}>{user ? authUser() : unAuthUser()}</div>
			</Toolbar>
		</AppBar>
	);
}
