import React from 'react';
import PropTypes from 'prop-types';

import { DropdownField } from 'components/field-types';

export default class Filter extends React.PureComponent {
    static propTypes = {
        filterVals: PropTypes.object.isRequired,
        filters: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            multiple: PropTypes.bool,
            label: PropTypes.string.isRequired
        })),
        datasources: PropTypes.object,
        actions: PropTypes.shape({
            fetchDatasource: PropTypes.func.isRequired,
            setFilter: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { filterVals, filters, datasources, actions } = this.props;

        if (!filters) {
            return null;
        }

        return filters.map((filter) => {
            filter.onChange = (val) => actions.setFilter(filter.name, val);
            filter.actions = actions;
            filter.datasources = datasources;
            filter.value = filterVals[filter.name] ? filterVals[filter.name] : (filter.multiple ? [] : '');

            return <DropdownField placeholder={`${filter.label} Filter`} key={`${filter.name}-filter`} {...filter} />;
        });
    }
}