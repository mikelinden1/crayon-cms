import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import itemPropShape from 'utils/item-prop-shape';

import config from 'config';

import DragHandle from './drag-handle';
import TableCell from './table-cell';
import ButtonColumn from './button-column';

class TableRow extends React.PureComponent {
    static propTypes = {
        item: PropTypes.shape(itemPropShape()).isRequired
    };

    mapColumns(item) {
        const { views: { table: { columns: listColumns, showId } }, capabilities: { reorderable } } = config;

        const cols = listColumns.map((column) => {
            return <TableCell key={`${item.id}-${column.name}`} column={column} item={item} />;
        });

        if (showId) {
            cols.unshift(<TableCell key={`${item.id}-id`} column={{name: 'id', label: 'ID'}} item={item} />);
        }

        if (reorderable) {
            cols.unshift(<td key={`${item.id}-sort-handle`}><DragHandle /></td>);
        }

        cols.push(<ButtonColumn item={item} key={`${item.id}-buttons`} />);

        return cols;
    }

    render() {
        const { item } = this.props;

        return <tr style={{width: '100%'}} key={`${item.id}-row`}>{this.mapColumns(item)}</tr>;
    }
};

export default SortableElement(TableRow);