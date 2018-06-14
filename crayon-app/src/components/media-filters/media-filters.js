import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { faSearch } from '@fortawesome/fontawesome-free-solid';
import Icon from 'components/icon';

import config from 'config';

export default class MediaFilters extends React.PureComponent {
    static propTypes = {
        search: PropTypes.string,
        sort: PropTypes.string,
        moduleFilter: PropTypes.string,
        actions: PropTypes.shape({
            setSearch: PropTypes.func.isRequired
        }).isRequired
    };

    getModules() {
        const options = config.moduleOrder.map((id) => {
            return { value: id, label: id.charAt(0).toUpperCase() + id.slice(1) }
        });

        options.unshift({ value: '', label: 'All Modules' });

        return options;
    }

    render() {
        const { search, sort, moduleFilter, actions: { setSearch, setModuleFilter, setSort } } = this.props;

        return (
            <div className="media-filters">
                <Select
                    name="media-module-filter"
                    value={moduleFilter}
                    placeholder="Show media from..."
                    onChange={(e) => setModuleFilter(e ? e.value : '')}
                    options={this.getModules()}
                />
                <Select
                    name="media-sort"
                    value={sort}
                    placeholder="Sort by"
                    onChange={(e) => setSort(e ? e.value : 'desc')}
                    options={[{ value: 'desc', label: 'Most Recent First' }, { value: 'asc', label: 'Oldest First' }]}
                />
                <div className="search-box">
                    <input type="search" placeholder="Search" className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} name="search" />
                    <div className="search-icon"><Icon icon={faSearch} /></div>
                    {
                    search !== ''
                    ?   <button onClick={() => setSearch('')} className="clear-search">&times;</button>
                    :   null
                    }
                </div>
            </div>
        );
    }
}