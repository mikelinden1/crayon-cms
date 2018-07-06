import { ActionTypes } from 'utils/constants';

export function setCurrentPage(p) {
    return (dispatch, getState) => {
        const state = getState();
        const moduleId = state.currentModule;

        dispatch({
            type: `${ActionTypes.SET_CURRENT_PAGE}_${moduleId}`,
            payload: p
        });
    };
};