import { ActionTypes } from 'utils/constants';
import getPropByName from 'utils/get-prop-by-name';
import { arrayMove } from 'react-sortable-hoc';

export function setItemProp(key, val, ignoreChange = false) {
    return (dispatch, getState) => {
        const state = getState();
        const moduleId = state.currentModule;

        const itemProps = getPropByName(moduleId, key);

        if (itemProps.hooks && itemProps.hooks.change && typeof itemProps.hooks.change === 'function') {
            // call the change hook with the new value + a function to trigger a SET_PROP_VALUE for side-effects
            val = itemProps.hooks.change(val, (effectKey, effectVal) => {
                dispatch({
                    type: `${ActionTypes.SET_PROP_VALUE}_${moduleId}`,
                    payload: { key: effectKey, val: effectVal, ignoreChange: false }
                });
            });
        }

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

export function multiItemSortEnd(key, items, oldIndex, newIndex) {
    return (dispatch, getState) => {
        const state = getState();
        const moduleId = state.currentModule;

        const newItems = arrayMove(items, oldIndex, newIndex);

        dispatch({
            type: `${ActionTypes.MULTI_ITEM_SORT_END}_${moduleId}`,
            payload: { key, newItems }
        });
    };
}