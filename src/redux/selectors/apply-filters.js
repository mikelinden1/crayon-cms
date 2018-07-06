import { createSelector } from 'reselect';
import getModuleConfig from 'utils/get-module-config';

const config = (state) => getModuleConfig(state.currentModule);
const filters = (state) => state[state.currentModule].filters;
const items = (state) => state[state.currentModule].items.items;

export const applyFilters = createSelector(
    [ config, filters, items ],
    (config, filters, items) => {
        const { filtering: { filterFields } } = config;

        if (!filterFields || !filterFields.length) {
            // we don't have filtering turned on for this plugin
            return items;
        }

        return items.filter((item) => {
            // use reduce to flip a boolean if a filter doesn't match. If we get to the end of the filters and the boolean is still truthy we have an item that matches all filters
            return filterFields.reduce((prevMatch, filterField) => {
                if (!prevMatch) {
                    // a previous filter wasn't a match therefore this entire item can't match
                    return false;
                }

                if (!filters[filterField]) {
                    // the filter isn't set so it will match everything
                    return true;
                }

                if (!item[filterField]) {
                    // property isn't set on item so it isn't a match
                    return false;
                }

                // check if the filter value matches the filter
                if (typeof filters[filterField] === 'object') {
                    // filter is an array that can match multiple values, use the same method as above but in reverse, if item value matched ANY filter value return true
                    return filters[filterField].reduce((prevMatch, val) => {
                        if (prevMatch) {
                            return true;
                        }

                        return item[filterField].indexOf(val) !== -1;
                    }, false);
                } else {
                    // filter is a string
                    return item[filterField] === filters[filterField];
                }
            }, true);
        });
    }
);
