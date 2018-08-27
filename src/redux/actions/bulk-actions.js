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