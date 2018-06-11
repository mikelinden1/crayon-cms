import { ActionTypes } from 'utils/constants';

export function setItemProp(key, val) {
    return {
        type: ActionTypes.SET_PROP_VALUE,
        payload: { key, val }
    };
}
