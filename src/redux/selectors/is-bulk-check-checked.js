import { createSelector } from 'reselect';
import { getFilteredItems } from 'redux/selectors/get-filtered-items';

const selectedItems = (state) => state[state.currentModule].bulkActions.selectedItems;
const thisId = (state, props) => props.id;

export const isBulkCheckChecked = createSelector(
    [ selectedItems, thisId ],
    (selectedItems, thisId) => {
        if (!selectedItems) {
            return false;
        }

        return selectedItems.filter((id) => thisId === id).length > 0;
    }
);

const filteredItems = (state, props) => getFilteredItems(state, props);

export const isAllBulkCheckChecked = createSelector(
    [ selectedItems, filteredItems ],
    (selectedItems, filteredItems) => {
        if (!selectedItems || !filteredItems) {
            return false;
        }

        return selectedItems.length === filteredItems.length;
    }
);