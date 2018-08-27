import { ActionTypes } from 'utils/constants';

const initialState = {
    selectedItems: []
};

function bulkActionsCreator(id) {
    return function bulkActions(state = initialState, action) {
        switch (action.type) {
            case `${ActionTypes.TOGGLE_BULK_CHECKBOX}_${id}`: {
                const id = action.payload;

                let selectedItems = [...state.selectedItems];
                const isSelected = selectedItems.filter((item) => item === id).length;

                if (isSelected) {
                    selectedItems = selectedItems.filter((item) => item !== id);
                } else {
                    selectedItems.push(id);
                }

                return {
                    ...state,
                    selectedItems
                };
            }
            case `${ActionTypes.DELETE_ITEM}_${id}`: {
                // when an item is deleted, make sure to remove it from selected items
                const id = action.payload;
                const selectedItems = state.selectedItems.filter((item) => item !== id);

                return {
                    ...state,
                    selectedItems
                };
            }
            case `${ActionTypes.TOGGLE_ALL_BULK_CHECKBOXES}_${id}`: {
                return {
                    ...state,
                    selectedItems: action.payload
                };
            }
            case `${ActionTypes.SELECT_BULK_ACTION}_${id}`: {
                return {
                    ...state,
                    selectedAction: action.payload
                };
            }
            default: {
                return state;
            }
        }
    };
}

export default bulkActionsCreator;