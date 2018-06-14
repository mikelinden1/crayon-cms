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
                items: action.payload.media
            };
        }
        default: {
            return state;
        }
    }
}