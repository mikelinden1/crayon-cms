import { createSelector } from 'reselect';

import { getFilteredItems } from './get-filtered-items';
import getModuleConfig from 'utils/get-module-config';

const config = (state) => getModuleConfig(state.currentModule);
const filteredItems = (state) => getFilteredItems(state);
const page = (state) => state[state.currentModule].paginator.currentPage;

export const getFilteredAndPaginatedItems = createSelector(
    [ config, filteredItems, page ],
    (config, filteredItems, page) => {
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
