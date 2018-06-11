import { ActionTypes } from 'utils/constants';

export function showLoader() {
    return (dispatch, getState) => {
        const state = getState();
        const moduleId = state.currentModule;

        dispatch({ type: `${ActionTypes.SHOW_LOADER}_${moduleId}` });
    };
};

export function hideLoader() {
    return (dispatch, getState) => {
        const state = getState();
        const moduleId = state.currentModule;

        dispatch({ type: `${ActionTypes.HIDE_LOADER}_${moduleId}` });
    };
};