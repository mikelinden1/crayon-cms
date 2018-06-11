import { ActionTypes, API_ENDPOINT } from 'utils/constants';
import config from 'config';

import axios from 'axios';

import { arrayMove } from 'react-sortable-hoc';

const { itemName, itemProps, pluginId, capabilities } = config;

export function fetchItems() {
    return (dispatch) => {
        startPolling(dispatch);

        const wpAction = `get_${pluginId}`;
        const action = {};

        action.type = ActionTypes.FETCH_ITEMS;
        action.payload = axios.get(`${API_ENDPOINT}?action=${wpAction}`);

        dispatch(action);
    };
};

export function startPolling(dispatch) {
    setTimeout(() => refreshItems(dispatch), 30000);
}

function refreshItems(dispatch) {
    const wpAction = `get_${pluginId}`;

    axios.get(`${API_ENDPOINT}?action=${wpAction}`).then((data) => {
        dispatch({
            type: ActionTypes.FETCH_ITEMS + '_FULFILLED',
            payload: data
        });

        startPolling(dispatch);
    })
}

export function validateOnChange() {
    return (dispatch, getState) => {
        const state = getState();
        const data = state.modalItemProps;

        validateItems(data, dispatch);
    };
}

function validateItems(data, dispatch) {
    const errors = [];

    itemProps.forEach((item) => {
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
        type: ActionTypes.VALIDATION_CHECK,
        payload: errors
    });

    return !errors.length > 0;
}

export function saveNewItem(data) {
    return (dispatch, getState) => {
        const valid = validateItems(data, dispatch);

        if (valid) {
            const wpAction = `post_${pluginId}`;
            const action = {};

            action.type = ActionTypes.SAVE_NEW_ITEM;
            action.payload = axios.post(`${API_ENDPOINT}?action=${wpAction}`, data);

            dispatch(action);
        }
    };
};

export function editItem(item) {
    return {
        type: ActionTypes.EDIT_ITEM,
        payload: item
    };
}

export function saveEditItem(data) {
    return (dispatch, getState) => {
        const valid = validateItems(data, dispatch);

        if (valid) {
            dispatch({
                type: ActionTypes.SAVE_EDIT_ITEM,
                payload: data
            });

            const wpAction = `put_${pluginId}`;

            const action = {};

            action.type = ActionTypes.SAVE_EDIT_ITEM;
            action.payload = axios.put(`${API_ENDPOINT}?action=${wpAction}`, data);

            dispatch(action);
        }
    };
};

export function deleteItem(item) {
    return (dispatch, getState) => {
        const localDeleteIdProp = capabilities.deleteIdProp ? capabilities.deleteIdProp : 'name';
        const name = item[localDeleteIdProp];

        const itemIdentifier = name ? `\n\n${name}` : '';

        if (window.confirm(`Are you sure you want to delete this ${itemName.toLowerCase()}?${itemIdentifier}`)) {
            dispatch({
                type: ActionTypes.DELETE_ITEM,
                payload: item.id
            });

            const wpAction = `delete_${pluginId}`;
            const action = {};

            action.type = ActionTypes.DELETE_ITEM;
            action.payload = axios.delete(`${API_ENDPOINT}?action=${wpAction}&id=${item.id}`);

            dispatch(action);
        }
    };
};

export function sortEnd(items, oldIndex, newIndex) {
    return (dispatch, getState) => {
        let newItems = arrayMove(items, oldIndex, newIndex);
        newItems = newItems.map((mod, i) => {
            mod.sort = i;
            return mod;
        });

        dispatch({
            type: ActionTypes.ITEM_SORT_END,
            payload: newItems
        });

        const payload = newItems.reduce((collector, i) => {
            collector[`item_${i.id}`] = i.sort;
            return collector;
        }, {});

        const wpAction = `sort_${pluginId}`;
        const action = {};

        action.type = ActionTypes.ITEM_SORT_END;
        action.payload = axios.post(`${API_ENDPOINT}?action=${wpAction}`, payload);

        dispatch(action);
    };
}