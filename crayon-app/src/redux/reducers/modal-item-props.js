import { ActionTypes } from 'utils/constants';
import config from 'config';

function modalItemPropsCreator(id) {
    const moduleConfig = config.modules[id];
    const isReorderable = moduleConfig.capabilities.reorderable;

    const initialState = isReorderable ? { sort: 9999999 } : {};

    return function modalItemProps(state = initialState, action) {
        switch (action.type) {
            case `${ActionTypes.SET_PROP_VALUE}_${id}`: {
                const nextState = {...state};

                const key = action.payload.key;
                const val = action.payload.val;

                nextState[key] = val;

                return nextState;
            }
            case `${ActionTypes.EDIT_ITEM}_${id}`: {
                return Object.assign({}, action.payload);
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

export default modalItemPropsCreator;