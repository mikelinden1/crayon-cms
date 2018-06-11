import { ActionTypes } from 'utils/constants';

export function showLoader() {
    return (dispatch, getState) => {
        dispatch({ type: ActionTypes.SHOW_LOADER });
    };
};

export function hideLoader() {
    return (dispatch, getState) => {
        dispatch({ type: ActionTypes.HIDE_LOADER });
    };
};