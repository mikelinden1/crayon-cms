import React from 'react';
import PropTypes from 'prop-types';
import config from 'config';

export default class SortDropdowns extends React.PureComponent {
    static propTypes = {
        currentSort: PropTypes.shape({
            field: PropTypes.string.isRequired,
            desc: PropTypes.bool
        }).isRequired,
        actions: PropTypes.shape({
            setSort: PropTypes.func.isRequired
        }).isRequired
    };

    setSortField(field) {
        const { currentSort } = this.props;

        const newSort = {
            field,
            desc: currentSort.desc
        };

        this.setSort(newSort);
    }

    setSortDir(desc) {
        const { currentSort } = this.props;

        desc = desc === 'desc' ? true : false;

        const newSort = {
            field: currentSort.field,
            desc
        };

        this.setSort(newSort);
    }

    setSort(sort) {
        const { actions: { setSort } } = this.props;
        setSort(sort);
    }

    render() {
        const { views: { table: { columns: listColumns } }, capabilities: { reorderable }, filtering: { sortable } } = config;

        if (!listColumns || reorderable || !sortable) {
            return null;
        }

        const { currentSort } = this.props;
        const selectStyle = { display: 'inline-block', margin: '0 5px', width: '150px', maxWidth: '100%' };

        return (
            <div className="sort-dropdowns form-group">
                <label className="control-label">Sort By</label>
                <select value={currentSort.field} className="form-control" style={selectStyle} onChange={(e) => this.setSortField(e.target.value)}>
                    <option key="sort-dd-opt-id" value="id">Date Added</option>
                    {listColumns.map((col) => {
                        if (col.noSort) { return null; }
                        return <option key={`sort-dd-opt-${col.name}`} value={col.name}>{col.heading}</option>;
                    })}
                </select>
                <select value={currentSort.desc ? 'desc' : 'asc'} className="form-control" style={selectStyle} onChange={(e) => this.setSortDir(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        );
    }
}