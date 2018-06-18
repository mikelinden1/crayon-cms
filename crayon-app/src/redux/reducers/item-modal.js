import { ActionTypes } from 'utils/constants';

const initialState = {
    open: false,
    saving: false,
    changeMade: false
};

function itemModalCreator(id) {
    return function itemModal(state = initialState, action) {
        switch (action.type) {
            case `${ActionTypes.EDIT_ITEM}_${id}`:
            case `${ActionTypes.OPEN_ITEM_DIALOG}_${id}`: {
                return {
                    ...state,
                    open: true,
                    changeMade: false
                };
            }
            case `${ActionTypes.CLOSE_ITEM_DIALOG}_${id}`: {
                return {
                    ...state,
                    open: false,
                    error: null,
                    changeMade: false
                };
            }
            case `${ActionTypes.SET_PROP_VALUE}_${id}`: {
                if (action.payload.ignoreChange) {
                    return { ...state };
                }

                return {
                    ...state,
                    changeMade: true
                };
            }
            case `${ActionTypes.VALIDATION_CHECK}_${id}`: {
                return {
                    ...state,
                    validationErrors: action.payload
                };
            }
            case `${ActionTypes.SAVE_EDIT_ITEM}_${id}_PENDING`:
            case `${ActionTypes.SAVE_NEW_ITEM}_${id}_PENDING`: {
                return {
                    ...state,
                    saving: true
                };
            }
            case `${ActionTypes.SAVE_EDIT_ITEM}_${id}_FULFILLED`: {
                return {
                    ...state,
                    saving: false,
                    open: false
                };
            }
            case `${ActionTypes.SAVE_NEW_ITEM}_${id}_FULFILLED`: {
                const newId = action.payload.data;

                if (newId) {
                    return {
                        ...state,
                        saving: false,
                        open: false
                    };
                } else {
                    return {
                        ...state,
                        saving: false,
                        error: true
                    };
                }
            }
            case `${ActionTypes.SAVE_EDIT_ITEM}_${id}_REJECTED`:
            case `${ActionTypes.SAVE_NEW_ITEM}_${id}_REJECTED`: {
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
}

export default itemModalCreator;