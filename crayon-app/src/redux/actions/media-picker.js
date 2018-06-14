import { ActionTypes } from 'utils/constants';
import { setItemProp } from 'redux/actions/modal-item-props';

import config from 'config';

import axios from 'axios';

const API_BASE = config.apiBase;

export function fetchMedia() {
    return (dispatch) => {
        const action = {};

        action.type = `${ActionTypes.FETCH_MEDIA}`;
        action.payload = axios.get(`${API_BASE}/media?transform=1`);

        dispatch(action);
    };
};
export function showMediaPicker(fieldName) {
    return {
        type: ActionTypes.SHOW_MEDIA_PICKER,
        payload: fieldName
    };
};

export function closeMediaPicker() {
    return {
        type: ActionTypes.CLOSE_MEDIA_PICKER
    };
};

export function mediaPickerClickItem(item) {
    return {
        type: ActionTypes.MEDIA_PICKER_CLICK_ITEM,
        payload: item
    };
}

export function mediaPickerSelectedItem(val) {
    return (dispatch, getState) => {
        const state = getState();
        const target = state.mediaPicker.target;

        dispatch({ type: ActionTypes.MEDIA_PICKER_SELECTED_ITEM });
        dispatch(setItemProp(target, val));
    };
}