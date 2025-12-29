// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import login from './login';
import user from './user';
import common from './common';
import languages from './languages';
import booking from './booking';
import routing from './routing';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, login, common, languages, user,booking,routing, });

export default reducers;
