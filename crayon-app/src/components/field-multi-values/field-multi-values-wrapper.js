import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';

import getPropByName from 'utils/get-prop-by-name';

import FieldMultiValuesRow from './field-multi-values-row';

class FieldMultiValueWrapper extends React.PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        currentModule: PropTypes.string.isRequired,
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
        const { allValue, name, currentModule } = this.props;

        const theProp = getPropByName(currentModule, name);

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
                                isPhoto={theProp.type === 'photo'}
                                deleteItem={() => this.deleteItem(i)} />
                })}
            </ul>
        );
    }
}

export default SortableContainer(FieldMultiValueWrapper);