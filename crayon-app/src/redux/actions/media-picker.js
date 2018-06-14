import { ActionTypes } from 'utils/constants';
import { setItemProp } from 'redux/actions/modal-item-props';

export function showMediaPicker(fieldName) {
    return {
        type: ActionTypes.SHOW_MEDIA_PICKER,
        payload: fieldName
    };
};

export function mediaPickerSelectedItem(val) {
    return (dispatch, getState) => {
        const state = getState();
        const target = state.mediaPicker.target;

        dispatch({ type: ActionTypes.MEDIA_PICKER_SELECTED_ITEM });
        dispatch(setItemProp(target, val));
    };
}