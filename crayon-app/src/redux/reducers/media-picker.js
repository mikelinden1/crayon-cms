import { ActionTypes } from 'utils/constants';

const initialState = {
    fetched: false,
    fetching: false
};

export default function mediaPicker(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SHOW_MEDIA_PICKER: {
            return {
                ...state,
                open: true,
                target: action.payload
            }
        }
        case ActionTypes.CLOSE_MEDIA_PICKER:
        case ActionTypes.MEDIA_PICKER_SELECTED_ITEM: {
            return {
                ...state,
                open: false,
                target: null
            };
        }
        case ActionTypes.MEDIA_PICKER_CLICK_ITEM: {
            return {
                ...state,
                selectedItem: action.payload
            }
        }
        case ActionTypes.FETCH_MEDIA + '_PENDING': {
            return {
                ...state,
                fetching: true
            };
        }
        case ActionTypes.FETCH_MEDIA + '_REJECTED': {
            return {
                ...state,
                fetching: false,
                error: true,
                fetched: true
            };
        }
        case ActionTypes.FETCH_MEDIA + '_FULFILLED': {
            return {
                ...state,
                fetching: false,
                fetched: true,
                items: action.payload.data.media
            };
        }
        default: {
            return state;
        }
    }
}