import { ActionTypes } from 'utils/constants';

export function openItemModal() {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: `${ActionTypes.OPEN_ITEM_DIALOG}_${state.currentModule}`
        });
    };
}

export function closeItemModal() {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: `${ActionTypes.CLOSE_ITEM_DIALOG}_${state.currentModule}`
        });
    };
}