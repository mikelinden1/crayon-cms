import { ActionTypes } from 'utils/constants';

export function setModule(id) {
    return {
        type: ActionTypes.SET_MODULE_ID,
        payload: id
    };
};
