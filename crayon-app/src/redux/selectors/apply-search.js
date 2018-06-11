import { createSelector } from 'reselect';
import config from 'config';

const searchTerms = (state) => state.search.terms.toLowerCase();
const items = (state) => state.items.items;

export const applySearch = createSelector(
    [ searchTerms, items ],
    (searchTerms, items) => {
        const { filtering: { searchFields } } = config;

        if (!searchFields || !searchFields.length) {
            // we don't have searching turned on for this plugin
            return items;
        }

        return items.filter((item) => {
            // use reduce to flip a boolean if a filter doesn't match. If we get to the end of the filters and the boolean is still truthy we have an item that matches all filters

            if (!searchTerms || !searchTerms.length) {
                // no search terms yet
                return true;
            }

            return searchFields.reduce((prevMatch, searchField) => {
                if (prevMatch) {
                    // a previous field matched so return it
                    return true;
                }

                if (!item[searchField]) {
                    // property isn't set on item so it isn't a match
                    return false;
                }

                return item[searchField].toLowerCase().indexOf(searchTerms) !== -1;
            }, false);
        });
    }
);
