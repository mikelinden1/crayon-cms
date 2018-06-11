import { ActionTypes } from 'utils/constants';

const initialState = 'all';

function archiveCreator(id) {
    return function archive(state = initialState, action) {
        switch (action.type) {
            case ActionTypes.SET_ARCHIVE: {
                return action.payload;
            }
            case ActionTypes.CLEAR_FILTERS: {
                return initialState;
            }
            default: {
                return state;
            }
        }
    }
}

export default archiveCreator;