import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import { TOGGLE_MENU } from './actions';

const rootReducer = combineReducers({
  menu: menuReducer,
});

export default rootReducer;