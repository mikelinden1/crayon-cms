import { ActionTypes } from 'utils/constants';
import { setItemProp } from 'redux/actions/modal-item-props';

import config from 'config';

import axios from 'axios';

const API_BASE = config.apiBase;

export function fetchMedia() {
    return (dispatch) => {
        const action = {};

        action.type = `${ActionTypes.FETCH_MEDIA}`;
        action.payload = axios.get(`${API_BASE}/media?transform=1&order=id,desc`);

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

export function mediaPickerUpload(files) {
    return (dispatch, getState) => {
        const state = getState();
        const moduleId = state.currentModule;

        files.forEach((file) => {
            const data = new FormData();
            data.append('moduleId', moduleId);
            data.append('uploadDir', config.uploadPath);
            data.append('file', file);

            const uploadConfig = {
                onUploadProgress: (progressEvent) => console.log('upload progress', Math.round((progressEvent.loaded * 100) / progressEvent.total))
            };

            const action = {};
            action.type = ActionTypes.UPLOAD_FILE;
            action.payload = axios.post(`${API_BASE}/upload`, data, uploadConfig)

            dispatch(action);
        });
    };
}

export function setMediaSearch(val) {
    return {
        type: ActionTypes.SET_MEDIA_SEARCH,
        payload: val
    };
}

export function setMediaSort(val) {
    return {
        type: ActionTypes.SET_MEDIA_SORT,
        payload: val
    };
}

export function setMediaModuleFilter(val) {
    return {
        type: ActionTypes.SET_MEDIA_MODULE_FILTER,
        payload: val
    };
}