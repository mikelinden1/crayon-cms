import { ActionTypes } from 'utils/constants';

export function switchView(view) {
    return {
        type: ActionTypes.SWITCH_VIEW,
        payload: view
    };
}