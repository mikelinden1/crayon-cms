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

export function selectBulkAction(actionId) {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: `${ActionTypes.SELECT_BULK_ACTION}_${state.currentModule}`,
            payload: actionId
        });
    };
};

export function applyBulkAction(actionId) {
    return (dispatch, getState) => {
        const action = bulkActions[actionId];

        if (action) {
            const state = getState();
            const currentModule = state.currentModule;
            action(dispatch, currentModule, state[currentModule].bulkActions.selectedItems);
        }
    };
};

const bulkActions = {
    bulkDelete: (dispatch, currentModule, selectedItems) => {
        const { itemNamePlural } = config.modules[currentModule];

        if (window.confirm(`Are you sure you want to delete ${selectedItems.length} ${itemNamePlural.toLowerCase()}?`)) {
            dispatch({
                type: `${ActionTypes.BULK_DELETE}_${currentModule}`,
                payload: selectedItems
            });


            const action = {};

            const idStr = selectedItems.join(',');
            action.type = `${ActionTypes.BULK_DELETE}_${currentModule}`;
            action.payload = axios.delete(`${API_BASE}/${currentModule}/${idStr}`);

            dispatch(action);
        }

        return false;
    },
    bulkEdit: (dispatch, currentModule, selectedItems) => {
        return dispatch({
            type: `${ActionTypes.APPLY_BULK_EDIT}_${currentModule}`,
            payload: selectedItems
        });
    }
}