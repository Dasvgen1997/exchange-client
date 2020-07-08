import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import parseNum from './../../utils/parseNumber.js';

const useStyles = makeStyles((theme) => ({
	flex: {
		display: 'flex',
		justifyContent: 'space-between',
		'&>*': {
			width: '49%'
		}
	},
	field: {
		margin: '10px 0px'
	}
}));

export default function Select({
	userWallet,
	currentRate,
	sentValute,
	receiveValute,
	setSentValute,
	setReceiveValute,
	submitHandler
}) {
	const classes = useStyles();

	let receiveValuteCode = receiveValute.valute;

	useEffect(
		() => {
			calculateResult();
		},
		[ sentValute, receiveValuteCode ]
	);

	function changeCode(e, num) {
		let valute = e.target.value;

		if (num == 1) {
			setSentValute({ ...sentValute, valute });
		} else {
			setReceiveValute({ ...receiveValute, valute });
		}
	}

	function changeAmount(e) {
		let amount = e.target.value;

		if (amount < 0) return;

		let max = maxLimitSent(sentValute.valute);

		if (e.target.value >= max) {
			setSentValute({ ...sentValute, amount: max });
		} else {
			setSentValute({ ...sentValute, amount });
		}

		function maxLimitSent(code) {
			let receivePrice = getPrice(receiveValute.valute);

			let availableAmount = getAmountWallet(sentValute.valute) * getPrice(code);

			let maxSentAmount = parseNum(availableAmount) / parseNum(receivePrice);

			return Math.floor(maxSentAmount);
		}
	}

	function getPrice(code) {
		for (let p = 0; p < currentRate.length; p++) {
			let valute = currentRate[p];
			if (valute.valute == code) {
				return parseNum(valute.price);
			}
		}
	}

	function getAmountWallet(code) {
		for (let p = 0; p < userWallet.length; p++) {
			let valute = userWallet[p];
			if (valute.valute == code) {
				return parseNum(valute.amount);
			}
		}
	}

	function calculateResult() {
		console.log(sentValute, receiveValute, 'calculateResult');

		if (sentValute.valute == receiveValute.valute) {
			setReceiveValute({ valute: receiveValute.valute, amount: sentValute.amount });
			return;
		} else {
			if (0 == Number(sentValute.amount)) {
				setReceiveValute({ valute: receiveValute.valute, amount: 0 });
				return;
			}

			let purchasePrice = Number(sentValute.amount) * getPrice(sentValute.valute);
			console.log(purchasePrice, 'pur');
			let result = purchasePrice / getPrice(receiveValute.valute);
			console.log(result, 'resutl');
			result = Math.round(result * 100) / 100;
			setReceiveValute({ valute: receiveValute.valute, amount: result });
		}
	}

	return (
		<form onSubmit={submitHandler}>
			<div className={classes.flex}>
				<section>
					<Typography paragraph>Отдаёте</Typography>
					<TextField
						fullWidth
						select
						value={sentValute.valute}
						onChange={(e) => changeCode(e, 1)}
						label="Выберите валюту"
						variant="outlined"
						className={classes.field}
					>
						{userWallet.map((item) => (
							<MenuItem key={item._id} value={item.valute}>
								{item.valute}
							</MenuItem>
						))}
					</TextField>
				</section>
				<section>
					<Typography paragraph>Получаете</Typography>
					<TextField
						fullWidth
						select
						value={receiveValute.valute}
						onChange={(e) => changeCode(e, 2)}
						label="Выберите валюту"
						variant="outlined"
						className={classes.field}
					>
						{currentRate.map((item) => (
							<MenuItem key={item._id} value={item.valute}>
								{item.valute}
							</MenuItem>
						))}
					</TextField>
				</section>
			</div>
			<TextField
				fullWidth
				type="number"
				value={sentValute.amount}
				onChange={changeAmount}
				label={`Отдаёте ${sentValute.valute}`}
				variant="outlined"
				className={classes.field}
			/>
			<Typography className={classes.result} paragraph>
				Получаете: {`${receiveValute.amount} ${receiveValute.valute}`}
			</Typography>
			<Button type="submit" size="large" variant="contained" color="primary">
				Обменять
			</Button>
		</form>
	);
}
