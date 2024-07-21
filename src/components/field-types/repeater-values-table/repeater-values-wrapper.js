import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import RepeaterValuesRow from './repeater-values-row';

class RepeaterValuesWrapper extends React.PureComponent {
    deleteItem(idx) {
        const items = this.props.items;
        if (window.confirm(`Are you sure you want to delete "${items[idx].name}"?`)) {
            const newItems = [...items];
            newItems.splice(idx, 1);
            this.props.onChange(newItems);
        }
    }

    render() {
        const { items, label } = this.props;

        if (!items || !items.length || typeof items === 'string') {
            return <p><em>No {label} added.</em></p>;
        }

        return (
            <ul className="field-multi-values">
                {items.map((item, i) => {
                    return  <RepeaterValuesRow
                                index={i}
                                key={`repeater-item-${i}`}
                                item={item}
                                editItem={() => this.props.editItem(i, item)}
                                deleteItem={() => this.deleteItem(i)} />
                })}
            </ul>
        );
    }
}

export default SortableContainer(RepeaterValuesWrapper);