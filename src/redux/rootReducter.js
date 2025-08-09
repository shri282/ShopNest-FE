import { combineReducers } from 'redux';
import cartItemsCountReducer from "./cartItemsCount/reducer"

const appReducer = combineReducers({
  cartItemsCount: cartItemsCountReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;