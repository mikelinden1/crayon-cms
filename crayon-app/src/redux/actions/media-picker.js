import { ActionTypes } from 'utils/constants';

export function showMediaPicker(fieldName) {
    return {
        type: ActionTypes.SHOW_MEDIA_PICKER,
        payload: fieldName
    };
};
