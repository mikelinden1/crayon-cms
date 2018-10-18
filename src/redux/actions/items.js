import { ActionTypes } from 'utils/constants';
import config from 'config';
import { getEnvVar } from 'utils/get-env-var';

import axios from 'axios';

import { arrayMove } from 'react-sortable-hoc';

const API_BASE = getEnvVar('apiBase');

export function fetchItems(moduleId) {
    return (dispatch, getState) => {
        const actionBase = `${ActionTypes.FETCH_ITEMS}_${moduleId}`;

        dispatch({ type: `${actionBase}_PENDING` });

        axios.get(`${API_BASE}/${moduleId}?transform=1`).then((payload) => {
            dispatch({
                type: `${actionBase}_FULFILLED`,
                payload
            });

            pollAfterFetch(dispatch, getState, moduleId);
        }).catch((payload) => {
            dispatch({
                type: `${actionBase}_REJECTED`,
                payload
            });

            pollAfterFetch(dispatch, getState, moduleId);
        });
    };
};

function pollAfterFetch(dispatch, getState, moduleId) {
    const state = getState();
    const pollingStopped = state[moduleId].items.pollingStopped;

    if (!pollingStopped) {
        startPolling(moduleId)(dispatch, getState);
    }
}

export function startPolling(moduleId) {
    return (dispatch, getState) => {
        const pollerId = setTimeout(() => refreshItems(dispatch, getState, moduleId), 30000);

        dispatch({
            type: `${ActionTypes.START_POLLING}_${moduleId}`,
            payload: pollerId
        });
    };
}

export function stopPolling(moduleId) {
    return (dispatch, getState) => {
        const state = getState();
        const pollerId = state[moduleId].items.pollerId;

        clearTimeout(pollerId);

        dispatch({
            type: `${ActionTypes.STOP_POLLING}_${moduleId}`
        });
    };
}

function refreshItems(dispatch, getState, moduleId) {
    const state = getState();
    const active = state.activity.active;

    if (active) {
        fetchItems(moduleId)(dispatch, getState);
    } else {
        setTimeout(() => refreshItems(dispatch, getState, moduleId), 10000);
    }
}

export function validateOnChange() {
    return (dispatch, getState) => {
        const state = getState();
        const moduleId = state.currentModule;
        const data = state[moduleId].modalItemProps;

        validateItems(data, dispatch, moduleId);
    };
}

function validateItems(data, dispatch, moduleId) {
    const errors = [];

    const moduleConfig = config.modules[moduleId];

    moduleConfig.itemProps.forEach((item) => {
        const val = data[item.name] ? data[item.name] : '';

        if (item.required && val.trim() === '') {
            errors.push({
                itemName: item.name,
                msg: `${item.label} is required`
            });
        }

        if (item.minLength && val !== '' && val.length < item.minLength) {
            errors.push({
                itemName: item.name,
                msg: `${item.label} must be at least ${item.minLength} characters long`
            });
        }

        if (item.maxLength && val !== '' && val.length > item.maxLength) {
            errors.push({
                itemName: item.name,
                msg: `${item.label} must be less than ${item.maxLength} characters long`
            });
        }

        if (item.regexFormat && val !== '' && !item.regexFormat.test(val)) {
            errors.push({
                itemName: item.name,
                msg: item.regexErrorText
            });
        }
    });

    dispatch({
        type: `${ActionTypes.VALIDATION_CHECK}_${moduleId}`,
        payload: errors
    });

    return !errors.length > 0;
}

export function saveNewItem(data) {
    return (dispatch, getState) => {
        const state = getState();
        const moduleId = state.currentModule;
        const moduleConfig = config.modules[moduleId];

        const valid = validateItems(data, dispatch, moduleId);

        if (valid) {
            dispatch({
                type: `${ActionTypes.SAVE_NEW_ITEM}_${moduleId}`,
                payload: data
            });

            data = stringifyArrays(data);

            const action = {};

            action.type = `${ActionTypes.SAVE_NEW_ITEM}_${moduleId}`;
            action.payload = axios.post(`${API_BASE}/${moduleConfig.id}`, data);

            dispatch(action);
        }
    };
};

export function editItem(item) {
    return (dispatch, getState) => {
        const state = getState();
        const moduleId = state.currentModule;

        dispatch({
            type: `${ActionTypes.EDIT_ITEM}_${moduleId}`,
            payload: item
        });
    };
}

export function saveEditItem(data) {
    return (dispatch, getState) => {
        const state = getState();
        const moduleId = state.currentModule;
        const valid = validateItems(data, dispatch, moduleId);
        const moduleConfig = config.modules[moduleId];

        data = stringifyArrays(data);

        if (valid) {
            dispatch({
                type: `${ActionTypes.SAVE_EDIT_ITEM}_${moduleId}`,
                payload: data
            });

            const action = {};

            action.type = `${ActionTypes.SAVE_EDIT_ITEM}_${moduleId}`;
            action.payload = axios.put(`${API_BASE}/${moduleConfig.id}/${data.id}`, data);

            dispatch(action);
        }
    };
};

export function saveBulkEdit(data) {
    return (dispatch, getState) => {
        const state = getState();
        const moduleId = state.currentModule;

        const selectedItems = state[moduleId].bulkActions.selectedItems;

        dispatch({
            type: `${ActionTypes.SAVE_BULK_EDIT}_${moduleId}`,
            payload: {
                data,
                selectedItems
            }
        });

        // the api expects the data for all items being updated, so we need to duplicate the data for each item selected
        let dataDuplicated = selectedItems.reduce((allData, item) => {
            allData.push(data);
            return allData;
        }, []);

        delete data.sort;

        dataDuplicated = stringifyArrays(dataDuplicated);

        const action = {};

        const idStr = selectedItems.join(',');
        action.type = `${ActionTypes.SAVE_BULK_EDIT}_${moduleId}`;
        action.payload = axios.put(`${API_BASE}/${moduleId}/${idStr}`, dataDuplicated);

        dispatch(action);
    };
};

export function deleteItem(item) {
    return (dispatch, getState) => {
        const state = getState();

        const moduleId = state.currentModule;
        const moduleConfig = config.modules[moduleId];

        const { capabilities, itemName } = moduleConfig;

        const localDeleteIdProp = capabilities.deleteIdProp ? capabilities.deleteIdProp : 'name';
        const name = item[localDeleteIdProp];

        const itemIdentifier = name ? `\n\n${name}` : '';

        if (window.confirm(`Are you sure you want to delete this ${itemName.toLowerCase()}?${itemIdentifier}`)) {
            dispatch({
                type: `${ActionTypes.DELETE_ITEM}_${moduleId}`,
                payload: item.id
            });

            const action = {};

            action.type = `${ActionTypes.DELETE_ITEM}_${moduleId}`;
            action.payload = axios.delete(`${API_BASE}/${moduleConfig.id}/${item.id}`);

            dispatch(action);
        }
    };
};

export function sortEnd(items, oldIndex, newIndex) {
    return (dispatch, getState) => {
        const state = getState();
        const moduleId = state.currentModule;
        const moduleConfig = config.modules[moduleId];

        let newItems = arrayMove(items, oldIndex, newIndex);
        newItems = newItems.map((mod, i) => {
            mod.sort = i;
            return mod;
        });

        dispatch({
            type: `${ActionTypes.ITEM_SORT_END}_${moduleId}`,
            payload: newItems
        });

        let itemIds = [];
        const payload = newItems.reduce((collector, i) => {
            itemIds.push(i.id);
            collector.push({ sort: i.sort });
            return collector;
        }, []);

        itemIds = itemIds.join(',');

        const action = {};

        action.type = `${ActionTypes.ITEM_SORT_END}_${moduleId}`;
        action.payload = axios.put(`${API_BASE}/${moduleConfig.id}/${itemIds}`, payload);

        dispatch(action);
    };
}

function stringifyArrays(data) {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (Object.prototype.toString.call(data[key]) === '[object Array]') {
                data[key] = JSON.stringify(data[key]);
            }
        }
    }

    return data;
}