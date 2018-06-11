import React from 'react';
import PropTypes from 'prop-types';
import itemPropShape from 'utils/item-prop-shape';
import TableRow from '../table-row';
import { SortableContainer } from 'react-sortable-hoc';

class TableBody extends React.PureComponent {
    static propTypes = {
        config: PropTypes.object.isRequired,
        items: PropTypes.arrayOf(PropTypes.shape(itemPropShape())).isRequired
    };

    mapRows() {
        const { items, config: { capabilities: { reorderable } } } = this.props;

        return items.map((item, i) => {
            return <TableRow index={i} disabled={!reorderable} key={`${item.id}-row`} item={item} />;
        });
    }

    render() {
        return (
            <tbody>
                {this.mapRows()}
            </tbody>
        );
    }
}

export default SortableContainer(TableBody);