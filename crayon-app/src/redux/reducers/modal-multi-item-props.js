import { ActionTypes } from 'utils/constants';

function modalMultiItemPropsCreator(id) {
    return function modalMultiItemProps(state = {}, action) {
        switch (action.type) {
            case `${ActionTypes.SET_MULTI_PROP_VALUE}_${id}`: {
                const nextState = {...state};

                const key = action.payload.key;
                const val = action.payload.val;

                nextState[key] = val;

                return nextState;
            }
            case `${ActionTypes.SAVE_NEW_ITEM}_${id}_FULFILLED`:
            case `${ActionTypes.SAVE_EDIT_ITEM}_${id}_FULFILLED`:
            case `${ActionTypes.CLOSE_ITEM_DIALOG}_${id}`: {
                return {};
            }
            default: {
                return state;
            }
        }
    }
}

export default modalMultiItemPropsCreator;