import React from 'react';
import PropTypes from 'prop-types';

import getPropByName from 'utils/get-prop-by-name';
import { DropdownField } from 'components/field-types';

export default class Filter extends React.PureComponent {
    static propTypes = {
        filterVals: PropTypes.object.isRequired,
        config: PropTypes.object.isRequired,
        datasources: PropTypes.object,
        currentModule: PropTypes.string.isRequired,
        actions: PropTypes.shape({
            fetchDatasource: PropTypes.func.isRequired,
            setFilter: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { filterVals, currentModule, datasources, config, actions } = this.props;
        const { filtering: { filterFields: filters } } = config;

        if (!filters) {
            return null;
        }

        return filters.map((filter) => {
            const props = getPropByName(currentModule, filter);

            if (!props) {
                console.error('Missing prop in filters', filter);
                return null;
            }

            const filterProps = Object.assign({}, props);
            filterProps.onChange = (val) => actions.setFilter(filterProps.name, val);
            filterProps.actions = actions;
            filterProps.datasources = datasources;
            filterProps.value = filterVals[filterProps.name] ? filterVals[filterProps.name] : (filterProps.multiple ? [] : '');
            return <DropdownField placeholder={`${filterProps.label} Filter`} key={`${filterProps.name}-filter`} {...filterProps} />;
        });
    }
}