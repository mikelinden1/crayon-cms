import { ActionTypes } from 'utils/constants';
import axios from 'axios';
import config from 'config';

const API_BASE = config.apiBase;

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

        const complete = () => dispatch({ type: `${ActionTypes.SAVE_BULK_ITEMS}_${state.currentModule}` });

        const moduleId = state.currentModule;
        const moduleConfig = config.modules[moduleId];

        const saveItem = (i) => {
            if (!items[i]) {
                complete();
                return;
            }

            axios.post(`${API_BASE}/${moduleConfig.id}`, items[i]).then((res) => {
                dispatch({
                    type: `${ActionTypes.SAVE_NEW_ITEM}_${state.currentModule}_FULFILLED`,
                    payload: res
                });

                saveItem(++i);
            }).catch(() => dispatch({ type: `${ActionTypes.BULK_ADD_ERROR}_${state.currentModule}`, payload: 'Error saving items' }));
        };

        dispatch({ type: `${ActionTypes.SAVE_BULK_ITEMS}_${state.currentModule}_PENDING` })
        saveItem(0);
    };
}