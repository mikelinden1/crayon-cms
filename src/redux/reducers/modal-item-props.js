import { ActionTypes } from 'utils/constants';
import config from 'config';

function modalItemPropsCreator(id) {
    const moduleConfig = config.modules[id];
    const isReorderable = moduleConfig.capabilities.reorderable;

    const initialState = isReorderable ? { sort: 9999 } : {};

    return function modalItemProps(state = initialState, action) {
        switch (action.type) {
            case `${ActionTypes.SET_PROP_VALUE}_${id}`: {
                const nextState = {...state};

                const key = action.payload.key;
                const val = action.payload.val;

                nextState[key] = val;

                return nextState;
            }
            case `${ActionTypes.DELETE_MULTI_ITEM}_${id}`: {
                const nextState = {...state};
                const { key, index } = action.payload;

                const items = [...nextState[key]];
                items.splice(index, 1);

                nextState[key] = items;

                return nextState;
            }
            case `${ActionTypes.MULTI_ITEM_SORT_END}_${id}`: {
                const nextState = {...state};
                const { key, newItems } = action.payload;

                const items = [...newItems];

                nextState[key] = items;

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