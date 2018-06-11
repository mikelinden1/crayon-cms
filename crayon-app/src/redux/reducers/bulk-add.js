import { ActionTypes } from 'utils/constants';

const initialState = {
    open: false,
    adding: false,
    columns: [],
    csvContents: null
};

function itemModal(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.OPEN_BULK_ADD_DIALOG: {
            return {
                ...state,
                open: true
            };
        }
        case ActionTypes.CLOSE_BULK_ADD_DIALOG: {
            return {
                ...state,
                open: false,
                error: null
            };
        }
        case ActionTypes.SET_BULK_COLUMNS: {
            return {
                ...state,
                columns: action.payload
            };
        }
        case ActionTypes.ADD_BULK_COLUMN: {
            const columns = [...state.columns];
            columns.push(action.payload);

            return {
                ...state,
                columns
            };
        }
        case ActionTypes.SET_BULK_CSV_CONTENTS: {
            return {
                ...state,
                csvContents: action.payload
            };
        }
        case ActionTypes.BULK_ADD_ERROR: {
            return {
                ...state,
                error: action.payload,
                adding: false
            };
        }
        case ActionTypes.SAVE_BULK_ITEMS + '_PENDING': {
            return {
                ...state,
                adding: true
            };
        }
        case ActionTypes.SAVE_BULK_ITEMS + '_FULFILLED': {
            return {
                ...state,
                adding: false,
                open: false,
                columns: [],
                csvContents: null
            };
        }
        default: {
            return state;
        }
    }
}

export default itemModal;