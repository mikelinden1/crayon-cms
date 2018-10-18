import { ActionTypes } from 'utils/constants';

const initialState = {
    active: false,
    timerId: null
};

function activity(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.START_TRACKING_ACTIVITY: {
            return {
                ...state,
                active: true,
                timerId: action.payload
            };
        }
        case ActionTypes.SET_ACTIVE: {
            return {
                ...state,
                active: true
            };
        }
        case ActionTypes.SET_INACTIVE: {
            return {
                ...state,
                active: false
            };
        }
        default: {
            return state;
        }
    }
    
}

export default activity;