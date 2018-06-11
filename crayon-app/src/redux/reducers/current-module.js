import { ActionTypes } from 'utils/constants';

const initialState = null;

function currentModule(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_MODULE_ID: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}

export default currentModule;