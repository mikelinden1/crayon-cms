import { createSelector } from 'reselect';
import config from 'config';

import { getFilteredItems } from './get-filtered-items';

const filteredItems = (state) => getFilteredItems(state);
const page = (state) => state.paginator.currentPage;

export const getFilteredAndPaginatedItems = createSelector(
    [ filteredItems, page ],
    (filteredItems, page) => {
        if (page < 1) {
            page = 1;
        }

        const { itemsPerPage, capabilities: { reorderable } } = config;

        if (!itemsPerPage || reorderable) {
            return filteredItems;
        }

        const startItem = (page - 1) * itemsPerPage;
        const endItem = startItem + itemsPerPage;

        const paginatedItems = filteredItems.slice(startItem, endItem);

        return paginatedItems;
    }
);
