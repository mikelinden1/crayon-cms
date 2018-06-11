import { ActionTypes } from 'utils/constants';

const initialState = {
    open: false,
    adding: false,
    columns: [],
    csvContents: null
};

function bulkAddCreator(id) {
    return function bulkAdd(state = initialState, action) {
        switch (action.type) {
            case `${ActionTypes.OPEN_BULK_ADD_DIALOG}_${id}`: {
                return {
                    ...state,
                    open: true
                };
            }
            case `${ActionTypes.CLOSE_BULK_ADD_DIALOG}_${id}`: {
                return {
                    ...state,
                    open: false,
                    error: null
                };
            }
            case `${ActionTypes.SET_BULK_COLUMNS}_${id}`: {
                return {
                    ...state,
                    columns: action.payload
                };
            }
            case `${ActionTypes.ADD_BULK_COLUMN}_${id}`: {
                const columns = [...state.columns];
                columns.push(action.payload);

                return {
                    ...state,
                    columns
                };
            }
            case `${ActionTypes.SET_BULK_CSV_CONTENTS}_${id}`: {
                return {
                    ...state,
                    csvContents: action.payload
                };
            }
            case `${ActionTypes.BULK_ADD_ERROR}_${id}`: {
                return {
                    ...state,
                    error: action.payload,
                    adding: false
                };
            }
            case `${ActionTypes.SAVE_BULK_ITEMS}_${id}_PENDING`: {
                return {
                    ...state,
                    adding: true
                };
            }
            case `${ActionTypes.SAVE_BULK_ITEMS}_${id}_FULFILLED`: {
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
}

export default bulkAddCreator;