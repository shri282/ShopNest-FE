import { combineReducers } from 'redux';
import cartItemsCountReducer from "./cartItemsCount/reducer"

const rootReducer = combineReducers({
  cartItemsCount: cartItemsCountReducer
});

export default rootReducer;