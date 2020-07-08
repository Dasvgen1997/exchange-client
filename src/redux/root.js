
import {combineReducers} from 'redux';
import user from './user.js';
import wallet from './wallet.js';
import history from './history.js';

export default combineReducers({
    user,
    wallet,
    history
})
