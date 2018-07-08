import { ActionTypes } from 'utils/constants';
import { setItemProp, setMultiItemProp } from 'redux/actions/modal-item-props';
import getPropByName from 'utils/get-prop-by-name';
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
        const moduleId = state.currentModule;

        const targetProps = getPropByName(moduleId, target);

        dispatch({ type: ActionTypes.MEDIA_PICKER_SELECTED_ITEM });

        if (targetProps.many) {
            dispatch(setMultiItemProp(target, val));
        } else {
            dispatch(setItemProp(target, val));
        }
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