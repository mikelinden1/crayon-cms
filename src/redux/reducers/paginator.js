import { ActionTypes } from 'utils/constants';

const initialState = {
    currentPage: 1
};

function paginatorCreator(id) {
    return function paginator(state = initialState, action) {
        switch (action.type) {
            case `${ActionTypes.SET_CURRENT_PAGE}_${id}`: {
                return {
                    ...state,
                    currentPage: action.payload
                };
            }
            case `${ActionTypes.CLEAR_FILTERS}_${id}`:
            case `${ActionTypes.SET_ARCHIVE}_${id}`:
            case `${ActionTypes.SET_SORT}_${id}`:
            case `${ActionTypes.SET_FILTER}_${id}`:
            case `${ActionTypes.SET_SEARCH}_${id}`: {
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
}

export default paginatorCreator;