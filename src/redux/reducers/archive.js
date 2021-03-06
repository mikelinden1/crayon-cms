import { ActionTypes } from 'utils/constants';

const initialState = 'all';

function archiveCreator(id) {
    return function archive(state = initialState, action) {
        switch (action.type) {
            case `${ActionTypes.SET_ARCHIVE}_${id}`: {
                return action.payload;
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

export default archiveCreator;