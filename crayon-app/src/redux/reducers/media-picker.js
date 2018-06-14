import { ActionTypes } from 'utils/constants';

const initialState = {};

export default function mediaPicker(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SHOW_MEDIA_PICKER: {
            return {
                ...state,
                open: true,
                target: action.payload
            }
        }
        case ActionTypes.MEDIA_PICKER_SELECTED_ITEM: {
            return {
                ...state,
                open: false,
                target: null
            };
        }
        default: {
            return state;
        }
    }
}