import { ActionTypes } from 'utils/constants';

export function switchView(view) {
    return (dispatch, getState) => {
        const state = getState();
        const moduleId = state.currentModule;

        dispatch({
            type: `${ActionTypes.SWITCH_VIEW}_${moduleId}`,
            payload: view
        });
    };
}