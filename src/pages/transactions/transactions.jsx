import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Helmet} from 'react-helmet'
import {connect} from 'react-redux';

import loadHistory from './../../redux/actions/history-action.js';

const useStyles = makeStyles({
	table: {
		minWidth: 350
	},
	title: {
		fontSize: '30px'
	}
});


function History({loadHistory, history}) {
	useEffect(()=>{
		loadHistory()
	},[])

	const classes = useStyles();

	return (
		<Paper className={classes.paper} square elevation={3}>
      <Helmet>
        <title>
        История транзакций
        </title>
      </Helmet>
      <Typography gutterBottom align="center" variant="h2" className={classes.title}>
					История транзакций
				</Typography>
			<TableContainer>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Дата</TableCell>
							<TableCell align="right">Отправили</TableCell>
							<TableCell align="right">Получили</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{history.map((item) => (
							<TableRow key={item._id}>
								<TableCell component="th" scope="row">
									{item.date}
								</TableCell>
								<TableCell align="right"> {item.sent_amount}  &nbsp; {item.sent_valute}  </TableCell>
								<TableCell align="right">  {item.receive_amount}  &nbsp; {item.receive_valute}</TableCell>
								
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}


function mapStateToProps(state){
	return {
		history: state.history
	}
}

function mapDispatchToProps(dispatch){
	return {
		loadHistory: () => dispatch(loadHistory()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(History);