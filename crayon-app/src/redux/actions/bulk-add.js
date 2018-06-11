import { ActionTypes, API_ENDPOINT } from 'utils/constants';
import axios from 'axios';
import config from 'config';

export function addColumn(column) {
    return {
        type: ActionTypes.ADD_BULK_COLUMN,
        payload: column
    };
};

export function setColumns(columns) {
    return {
        type: ActionTypes.SET_BULK_COLUMNS,
        payload: columns
    };
};

export function setCsvContent(csv) {
    return {
        type: ActionTypes.SET_BULK_CSV_CONTENTS,
        payload: csv
    };
};

export function openBulkAddDialog() {
    return {
        type: ActionTypes.OPEN_BULK_ADD_DIALOG
    };
};

export function closeBulkAddDialog() {
    return {
        type: ActionTypes.CLOSE_BULK_ADD_DIALOG
    };
};

export function throwBulkError(error) {
    return {
        type: ActionTypes.BULK_ADD_ERROR,
        payload: error
    };
};

export function saveBulkItems(items) {
    return (dispatch) => {
        const complete = () => dispatch({ type: ActionTypes.SAVE_BULK_ITEMS + '_FULFILLED' });

        const { pluginId } = config;
        const wpAction = `post_${pluginId}`;

        const saveItem = (i) => {
            if (!items[i]) {
                complete();
                return;
            }

            axios.post(`${API_ENDPOINT}?action=${wpAction}`, items[i]).then((res) => {
                dispatch({
                    type: ActionTypes.SAVE_NEW_ITEM + '_FULFILLED',
                    payload: res
                });

                saveItem(++i);
            }).catch(() => dispatch({ type: ActionTypes.BULK_ADD_ERROR, payload: 'Error saving items' }));
        };

        dispatch({ type: ActionTypes.SAVE_BULK_ITEMS + '_PENDING' })
        saveItem(0);
    };
}