import { ActionTypes } from 'utils/constants';

const initialState = {};

function filters(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_FILTER: {
            const nextState = Object.assign({}, state);

            nextState[action.payload.name] = action.payload.val;

            return nextState;
        }
        case ActionTypes.CLEAR_FILTERS: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}

export default filters;