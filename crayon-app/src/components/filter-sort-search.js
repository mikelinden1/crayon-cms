import React from 'react';

import Filter from 'components/filter';
import Search from 'components/search';

export default class FilterSortSearch extends React.PureComponent {
    render() {
        return (
            <div className="filter-sort-search">
                <Filter />
                <Search />
            </div>
        );
    }
}