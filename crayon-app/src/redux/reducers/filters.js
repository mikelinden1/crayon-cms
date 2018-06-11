import { ActionTypes } from 'utils/constants';

const initialState = {};

function filtersCreator(id) {
    return function filters(state = initialState, action) {
        switch (action.type) {
            case `${ActionTypes.SET_FILTER}_${id}`: {
                const nextState = Object.assign({}, state);

                nextState[action.payload.name] = action.payload.val;

                return nextState;
            }
            case `${ActionTypes.CLEAR_FILTERS}_${id}`: {
                return initialState;
            }
            default: {
                return state;
            }
        }
    }
}

export default filtersCreator;