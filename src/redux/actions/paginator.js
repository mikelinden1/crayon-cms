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

export function setItemsPerPage(p) {
    return (dispatch, getState) => {
        const state = getState();
        const moduleId = state.currentModule;

        p = +p;

        if (p === 0) {
            p = null;
        }

        dispatch({
            type: `${ActionTypes.SET_ITEMS_PER_PAGE}_${moduleId}`,
            payload: p
        });
    };
}