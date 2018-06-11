import { ActionTypes } from 'utils/constants';

const initialState = { terms: '' };

function search(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_SEARCH: {
            return {
                terms: action.payload
            };
        }
        case ActionTypes.CLEAR_FILTERS: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}

export default search;