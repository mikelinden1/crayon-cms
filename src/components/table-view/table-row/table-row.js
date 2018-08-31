import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import { showBulkActions } from 'utils/show-bulk-actions';

import DragHandle from '../drag-handle';
import TableCell from '../table-cell';
import ButtonColumn from '../button-column';
import BulkCheck from '../bulk-check';

class TableRow extends React.PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired,
        config: PropTypes.object.isRequired
    };

    mapColumns(item) {
        const { config: { views: { table: { columns: listColumns, showId } }, capabilities } } = this.props;
        const { reorderable } = capabilities

        const cols = listColumns.map((column) => {
            return <TableCell key={`${item.id}-${column.name}`} column={column} item={item} />;
        });

        if (showId) {
            cols.unshift(<TableCell key={`${item.id}-id`} column={{name: 'id', label: 'ID'}} item={item} />);
        }

        if (showBulkActions(capabilities)) {
            cols.unshift(<td key={`${item.id}-bulk-check`}><BulkCheck id={item.id} /></td>);
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