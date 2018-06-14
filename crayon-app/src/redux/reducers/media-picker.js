import { ActionTypes } from 'utils/constants';

const initialState = {};

return function mediaPicker(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SHOW_MEDIA_PICKER: {
            return {
                ...state,
                open: true,
                target: action.payload
            }
        }
        default: {
            return state;
        }
    }
};