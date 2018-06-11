import { ActionTypes } from 'utils/constants';

function modalItemProps(state = {}, action) {
    switch (action.type) {
        case ActionTypes.SET_PROP_VALUE: {
            const nextState = {...state};

            const key = action.payload.key;
            const val = action.payload.val;

            nextState[key] = val;

            return nextState;
        }
        case ActionTypes.EDIT_ITEM: {
            return Object.assign({}, action.payload);
        }
        case ActionTypes.SAVE_NEW_ITEM + '_FULFILLED':
        case ActionTypes.SAVE_EDIT_ITEM + '_FULFILLED':
        case ActionTypes.CLOSE_ITEM_DIALOG: {
            return {};
        }
        default: {
            return state;
        }
    }
}

export default modalItemProps;