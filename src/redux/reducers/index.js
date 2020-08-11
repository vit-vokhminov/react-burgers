import {combineReducers} from 'redux';

import filters from './filters';
import burgers from './burgers';
import cart from './cart';

const rootReducer = combineReducers({
    filters,
    burgers,
    cart,
});

export default rootReducer;
