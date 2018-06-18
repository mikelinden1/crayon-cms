import { ActionTypes } from 'utils/constants';

export function setItemProp(key, val, ignoreChange = false) {
    return (dispatch, getState) => {
        const state = getState();
        const moduleId = state.currentModule;

        dispatch({
            type: `${ActionTypes.SET_PROP_VALUE}_${moduleId}`,
            payload: { key, val, ignoreChange }
        });
    };
};

export function setMultiItemProp(key, val) {
    return (dispatch, getState) => {
        const state = getState();
        const moduleId = state.currentModule;

        dispatch({
            type: `${ActionTypes.SET_MULTI_PROP_VALUE}_${moduleId}`,
            payload: { key, val }
        });
    };
};

export function deleteMultiItem(key, index) {
    return (dispatch, getState) => {
        const state = getState();
        const moduleId = state.currentModule;

        dispatch({
            type: `${ActionTypes.DELETE_MULTI_ITEM}_${moduleId}`,
            payload: { key, index }
        });
    };
};