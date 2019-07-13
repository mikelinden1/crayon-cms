import { ActionTypes } from 'utils/constants';
import axios from 'axios';
import { getModuleHook } from 'utils/get-module-hooks';

import { getEnvVar } from 'utils/get-env-var';

const API_BASE = getEnvVar('apiBase');

export function addColumn(column) {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: `${ActionTypes.ADD_BULK_COLUMN}_${state.currentModule}`,
            payload: column
        });
    };
};

export function setColumns(columns) {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: `${ActionTypes.SET_BULK_COLUMNS}_${state.currentModule}`,
            payload: columns
        });
    };
};

export function setCsvContent(csv) {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: `${ActionTypes.SET_BULK_CSV_CONTENTS}_${state.currentModule}`,
            payload: csv
        });
    };
};

export function openBulkAddDialog() {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: `${ActionTypes.OPEN_BULK_ADD_DIALOG}_${state.currentModule}`
        });
    };
};

export function closeBulkAddDialog() {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: `${ActionTypes.CLOSE_BULK_ADD_DIALOG}_${state.currentModule}`
        });
    };
};

export function throwBulkError(error) {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: `${ActionTypes.BULK_ADD_ERROR}_${state.currentModule}`,
            payload: error
        });
    };
};

export function saveBulkItems(items) {
    return (dispatch, getState) => {
        const state = getState();
        const moduleId = state.currentModule;

        dispatch({ type: `${ActionTypes.SAVE_BULK_ITEMS}_${moduleId}_PENDING` });

        const preSaveHook = getModuleHook(moduleId, 'preSave');
        if (preSaveHook) {
            const currentItems = (state[moduleId] && state[moduleId].items && state[moduleId].items.items) || [];
            items = items.map((item) => preSaveHook(item, currentItems));
        }

        axios.post(`${API_BASE}/${moduleId}`, items).then((res) => {
            const newIds = res.data;

            const newItems = items.map((item, i) => {
                item.id = newIds[i];
                return item;
            });

            dispatch({
                type: `${ActionTypes.SAVE_BULK_ITEMS}_${moduleId}_FULFILLED`,
                payload: newItems
            });
        }).catch(() => dispatch(throwBulkError('Error saving items')));
    };
}