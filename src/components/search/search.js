import React from 'react';
import PropTypes from 'prop-types';

import { Search as SearchControl } from 'semantic-ui-react';

export default class Search extends React.PureComponent {
    static propTypes = {
        search: PropTypes.string,
        config: PropTypes.object.isRequired,
        actions: PropTypes.shape({
            setSearch: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { search, config: { filtering: { searchFields } }, actions: { setSearch } } = this.props;

        if (!searchFields) {
            return null;
        }

        return (
            <SearchControl 
                fluid 
                placeholder="Search"
                showNoResults={false} 
                value={search} 
                onSearchChange={(e, data) => setSearch(data.value)} 
            />
        );
    }
}