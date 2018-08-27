import { ActionTypes } from 'utils/constants';
import config from 'config';
import { getEnvVar } from 'utils/get-env-var';

import axios from 'axios';

const API_BASE = getEnvVar('apiBase');

export function toggleBulkCheckbox(id) {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: `${ActionTypes.TOGGLE_BULK_CHECKBOX}_${state.currentModule}`,
            payload: id
        });
    };
};

export function toggleAllBulkCheckboxes(ids) {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: `${ActionTypes.TOGGLE_ALL_BULK_CHECKBOXES}_${state.currentModule}`,
            payload: ids
        });
    };
};

export function selectBulkAction(action) {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: `${ActionTypes.SELECT_BULK_ACTION}_${state.currentModule}`,
            payload: action
        });
    };
};

export function applyBulkAction(actionId) {
    return (dispatch, getState) => {
        const state = getState();

        const action = bulkActions[actionId];

        const currentModule = state.currentModule;

        if (action) {
            action(dispatch, currentModule, state[currentModule].bulkActions.selectedItems);
        }
    };
};

const bulkActions = {
    'bulkDelete': function(dispatch, currentModule, selectedItems) {
        const { itemNamePlural } = config.modules[currentModule];

        if (window.confirm(`Are you sure you want to delete ${selectedItems.length} ${itemNamePlural.toLowerCase()}?`)) {
            selectedItems.forEach((itemId) => {
                dispatch({
                    type: `${ActionTypes.DELETE_ITEM}_${currentModule}`,
                    payload: itemId
                });

                const action = {};

                action.type = `${ActionTypes.DELETE_ITEM}_${currentModule}`;
                action.payload = axios.delete(`${API_BASE}/${currentModule}/${itemId}`);

                dispatch(action);
            });
        }
    },
    'bulkEdit': function(dispatch, currentModule, selectedItems) {
        dispatch({
            type: `${ActionTypes.APPLY_BULK_EDIT}_${currentModule}`,
            payload: selectedItems
        });
    }
}