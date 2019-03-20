import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '../table-row';
import { SortableContainer } from 'react-sortable-hoc';
import { Table } from 'semantic-ui-react';

class TableBody extends React.PureComponent {
    static propTypes = {
        config: PropTypes.object.isRequired,
        items: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    mapRows() {
        const { items, config: { capabilities: { reorderable } } } = this.props;

        return items.map((item, i) => {
            return <TableRow index={i} disabled={!reorderable} key={`${item.id}-row`} item={item} />;
        });
    }

    render() {
        return (
            <Table.Body>
                {this.mapRows()}
            </Table.Body>
        );
    }
}

export default SortableContainer(TableBody);