import config from 'config';
import moment from 'moment';

import { createSelector } from 'reselect';

import { applyFilters } from './apply-filters';
import { applySearch } from './apply-search';

const filteredItems = (state) => applyFilters(state);
const searchItems = (state) => applySearch(state);
const archive = (state) => state.archive;
const sort = (state) => state.sort;

export const getFilteredItems = createSelector(
    [ filteredItems, searchItems, archive, sort ],
    (filteredItems, searchItems, archiveMode, sort) => {
        // be sure items in filteredItems are also in searchItems (in order to be displayed an item must be present in both);
        let items = filteredItems.filter((fItem) => {
            return searchItems.find((sItem) => fItem.id === sItem.id);
        });

        if (config.archive && config.archive.field && archiveMode !== 'all') {
            items = items.filter((aItem) => {
                const diff = moment(aItem[config.archive.field]).diff(moment());

                if (archiveMode === 'inactive') {
                    return diff < 0;
                } else {
                    return diff >= 0;
                }
            });
        }

        const sortedItems = items.sort((a, b) => {
            if (sort.desc) {
                if (b[sort.field] < a[sort.field]) {
                    return -1;
                }

                if (b[sort.field] > a[sort.field]) {
                    return 1;
                }

                return 0;
            }

            if (a[sort.field] < b[sort.field]) {
                return -1;
            }

            if (a[sort.field] > b[sort.field]) {
                return 1;
            }

            return 0;
        });

        return sortedItems;
    }
);
