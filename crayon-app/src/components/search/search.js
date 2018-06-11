import React from 'react';
import PropTypes from 'prop-types';
import config from 'config';

import { faSearch } from '@fortawesome/fontawesome-free-solid';
import Icon from 'components/icon';

export default class Search extends React.PureComponent {
    static propTypes = {
        search: PropTypes.string,
        actions: PropTypes.shape({
            setSearch: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { search, actions: { setSearch } } = this.props;
        const { filtering: { searchFields } } = config;

        if (!searchFields) {
            return null;
        }

        return (
            <div className="search-box">
                <input type="search" placeholder="Search" className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} name="search" />
                <div className="search-icon"><Icon icon={faSearch} /></div>
                {
                search !== ''
                ?   <button onClick={() => setSearch('')} className="clear-search">&times;</button>
                :   null
                }
            </div>
        );
    }
}