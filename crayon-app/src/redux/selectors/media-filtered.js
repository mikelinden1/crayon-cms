import { createSelector } from 'reselect';
import getModuleConfig from 'utils/get-module-config';

const moduleId = (state) => state.mediaPicker.moduleFilter;
const sort = (state) => state.mediaPicker.sort;
const search = (state) => state.mediaPicker.search;
const items = (state) => state.mediaPicker.items;

export const applyMediaFilters = createSelector(
    [ moduleId, sort, search, items ],
    (moduleId, sort, search, items) => {
        if (!items) {
            return [];
        }

        const moduleItems = items.filter((item) => {
            if (!moduleId) {
                return item;
            }

            return item.module === moduleId;
        });

        const searchItems = moduleItems.filter((item) => {
            if (!search) {
                return item;
            }

            return item.uploaded_as.indexOf(search) !== -1;
        });

        const sortedItems = searchItems.sort((a, b) => {
            if (sort === 'asc') {
                if (a.id < b.id) {
                    return -1;
                }

                if (a.id > b.id) {
                    return 1;
                }

                return 0;
            }

            if (b.id < a.id) {
                return -1;
            }

            if (b.id > a.id) {
                return 1;
            }

            return 0;
        });

        return sortedItems;
    }
);
