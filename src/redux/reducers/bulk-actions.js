import { ActionTypes } from 'utils/constants';

const initialState = {
    selectedItems: []
};

function bulkActionsCreator(id) {
    return function bulkActions(state = initialState, action) {
        switch (action.type) {
            case `${ActionTypes.TOGGLE_BULK_CHECKBOX}_${id}`: {
                const id = action.payload;

                let selected = [...state.selectedItems];
                const isSelected = selected.filter((item) => item === id).length;

                if (isSelected) {
                    selected = selected.filter((item) => item !== id);
                } else {
                    selected.push(id);
                }

                return {
                    ...state,
                    selectedItems: selected
                };
            }
            default: {
                return state;
            }
        }
    };
}

export default bulkActionsCreator;