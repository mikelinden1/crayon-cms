import { ActionTypes } from 'utils/constants';

export function setCurrentPage(p) {
    return {
        type: ActionTypes.SET_CURRENT_PAGE,
        payload: p
    };
};