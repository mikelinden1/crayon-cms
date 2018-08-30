import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';

import FieldMultiValuesRow from './field-multi-values-row';

class FieldMultiValueWrapper extends React.PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        prop: PropTypes.shape({
            type: PropTypes.string.isRequired
        }).isRequired,
        allValue: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.string
        ]).isRequired,
        actions: PropTypes.shape({
            deleteMultiItem: PropTypes.func.isRequired
        }).isRequired
    };

    deleteItem(i) {
        const { name, actions: { deleteMultiItem } } = this.props;

        if (window.confirm('Are you sure you want to delete this item?')) {
            deleteMultiItem(name, i);
        }
    }

    render() {
        const { allValue, name, currentModule, prop } = this.props;

        if (!allValue || !allValue.length || typeof allValue === 'string') {
            return <ul className="field-multi-values"></ul>;
        }

        return (
            <ul className="field-multi-values">
                {allValue.map((item, i) => {
                    return  <FieldMultiValuesRow
                                index={i}
                                key={`multi-item-${i}`}
                                item={item}
                                isPhoto={prop.type === 'photo'}
                                deleteItem={() => this.deleteItem(i)} />
                })}
            </ul>
        );
    }
}

export default SortableContainer(FieldMultiValueWrapper);