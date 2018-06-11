import { ActionTypes } from 'utils/constants';

const initialState = {
    open: false,
    saving: false,
    changeMade: false
};

function itemModal(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.EDIT_ITEM:
        case ActionTypes.OPEN_ITEM_DIALOG: {
            return {
                ...state,
                open: true,
                changeMade: false
            };
        }
        case ActionTypes.CLOSE_ITEM_DIALOG: {
            return {
                ...state,
                open: false,
                error: null,
                changeMade: false
            };
        }
        case ActionTypes.SET_PROP_VALUE: {
            return {
                ...state,
                changeMade: true
            };
        }
        case ActionTypes.VALIDATION_CHECK: {
            return {
                ...state,
                validationErrors: action.payload
            };
        }
        case ActionTypes.SAVE_EDIT_ITEM + '_PENDING':
        case ActionTypes.SAVE_NEW_ITEM + '_PENDING': {
            return {
                ...state,
                saving: true
            };
        }
        case ActionTypes.SAVE_EDIT_ITEM + '_FULFILLED':
        case ActionTypes.SAVE_NEW_ITEM + '_FULFILLED': {
            return {
                ...state,
                saving: false,
                open: false
            };
        }
        case ActionTypes.SAVE_EDIT_ITEM + '_REJECTED':
        case ActionTypes.SAVE_NEW_ITEM + '_REJECTED': {
            return {
                ...state,
                saving: false,
                error: true
            };
        }
        default: {
            return state;
        }
    }
}

export default itemModal;