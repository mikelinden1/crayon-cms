import { ActionTypes } from 'utils/constants';

const initialState = { terms: '' };

function searchCreator(id) {
    return function search(state = initialState, action) {
        switch (action.type) {
            case `${ActionTypes.SET_SEARCH}_${id}`: {
                return {
                    terms: action.payload
                };
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

export default searchCreator;