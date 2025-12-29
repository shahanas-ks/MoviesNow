
import { combineReducers } from 'redux';

import login from './login';
import user from './user';
import common from './common';
import languages from './languages';


const reducers = combineReducers({  login, common, languages, user, });

export default reducers;
