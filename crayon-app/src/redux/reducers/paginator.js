import { ActionTypes } from 'utils/constants';

const initialState = {
    currentPage: 1
};

function paginator(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.payload
            };
        }
        case ActionTypes.CLEAR_FILTERS:
        case ActionTypes.SET_ARCHIVE:
        case ActionTypes.SET_SORT:
        case ActionTypes.SET_FILTER:
        case ActionTypes.SET_SEARCH: {
            return {
                ...state,
                currentPage: 1
            };
        }
        default: {
            return state;
        }
    }
}

export default paginator;