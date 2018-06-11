import React from 'react';
import PropTypes from 'prop-types';
import itemPropShape from 'utils/item-prop-shape';
import config from 'config';
import TableRow from './table-row';
import { SortableContainer } from 'react-sortable-hoc';

class TableBody extends React.PureComponent {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape(itemPropShape())).isRequired
    };

    mapRows() {
        const { items } = this.props;
        const { capabilities: { reorderable } } = config;

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