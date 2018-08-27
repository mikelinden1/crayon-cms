import { createSelector } from 'reselect';

const selectedItems = (state) => state[state.currentModule].bulkActions.selectedItems;
const thisId = (state, props) => props.id;

export const isBulkCheckChecked = createSelector(
    [ selectedItems, thisId ],
    (selectedItems, thisId) => {
        if (!selectedItems) {
            return false;
        }

        return selectedItems.filter((id) => thisId === id).length;
    }
);