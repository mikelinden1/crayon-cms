import { ActionTypes } from 'utils/constants';
import { getEnvVar } from 'utils/get-env-var';

import axios from 'axios';

const API_BASE = getEnvVar('apiBase');

export function fetchMedia() {
    return (dispatch) => {
        const action = {};

        action.type = `${ActionTypes.FETCH_MEDIA}`;
        action.payload = axios.get(`${API_BASE}/media?transform=1&order=id,desc`);

        dispatch(action);
    };
};
export function showMediaPicker(onChange) {
    window.mediaPickerCallback = onChange;

    return {
        type: ActionTypes.SHOW_MEDIA_PICKER
    };
};

export function closeMediaPicker() {
    window.mediaPickerCallback = null;

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
        const onChange = window.mediaPickerCallback;

        if (onChange && typeof onChange === 'function') {
            onChange(val);
        }

        dispatch({
            type: ActionTypes.MEDIA_PICKER_SELECTED_ITEM,
            payload: val
        });
    };
}

export function mediaPickerUpload(files) {
    return (dispatch, getState) => {
        const state = getState();
        const moduleId = state.currentModule;

        files.forEach((file) => {
            const data = new FormData();
            data.append('moduleId', moduleId);
            data.append('uploadDir', getEnvVar('uploadPath'));
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

export function deleteMedia(id) {
    return (dispatch) => {
        if (window.confirm(`Are you sure you want to delete this photo?`)) {
            dispatch({
                type: ActionTypes.DELETE_MEDIA,
                payload: id
            });

            const action = {};

            action.type = ActionTypes.DELETE_MEDIA;
            action.payload = axios.delete(`${API_BASE}/media/${id}?uploadDir=${getEnvVar('uploadPath')}`);

            dispatch(action);
        }
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

export function mediaToggleNameEdit() {
    return {
        type: ActionTypes.MEDIA_TOGGLE_NAME_EDIT
    };
}

export function mediaSetNewName(name) {
    return {
        type: ActionTypes.MEDIA_SET_NAME,
        payload: name
    };
}

export function mediaSaveName(id, name) {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.MEDIA_SAVE_NAME,
            payload: { id, name }
        });

        const data = { id, name };

        const action = {};

        action.type = ActionTypes.MEDIA_SAVE_NAME;
        action.payload = axios.put(`${API_BASE}/media`, data);

        dispatch(action);
    };
}