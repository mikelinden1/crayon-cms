import { ActionTypes } from 'utils/constants';

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