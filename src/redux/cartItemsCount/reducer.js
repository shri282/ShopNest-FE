import * as actionTypes from "./types";

const INITIAL_STATE = {
    value: 0
}

const cartItemsCountReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actionTypes.SET:
            return { value: action.payload };

        case actionTypes.INCREMENT:
            return {
                ...state,
                value: state.value + 1
            }

        case actionTypes.DECREMENT:
            return {
                ...state,
                value: state.value - 1
            }
            
        case actionTypes.ADD:
            return {
                ...state,
                value: state.value + action.payload
            }

        default:
            return INITIAL_STATE;
    }
}

export default cartItemsCountReducer;