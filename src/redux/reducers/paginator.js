import { ActionTypes } from 'utils/constants';
import getModuleConfig from 'utils/get-module-config';

function paginatorCreator(id) {
    const moduleConfig = getModuleConfig(id);

    const initialState = {
        currentPage: 1,
        itemsPerPage: moduleConfig.itemsPerPage
    };

    return function paginator(state = initialState, action) {
        switch (action.type) {
            case `${ActionTypes.SET_ITEMS_PER_PAGE}_${id}`: {
                return {
                    ...state,
                    itemsPerPage: action.payload
                };
            }
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