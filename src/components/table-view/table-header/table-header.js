import React from 'react';
import SortColumn from 'components/sort-column';
import BulkMassCheck from 'components/table-view/bulk-mass-check';

import { Table } from 'semantic-ui-react';
import { showBulkActions } from 'utils/show-bulk-actions';

export default class ColumnHeadings extends React.PureComponent {
    render() {
        const { config: { views: { table: { columns: listColumns, showId } }, capabilities } } = this.props;
        const { reorderable } = capabilities;

        const cols = listColumns.map((column) => {
            const alignment = column.alignment ? `text-${column.alignment}` : 'text-left';
            return (
                <Table.HeaderCell key={`${column.heading}-heading`} className={alignment}>
                    {column.heading}
                    {
                    !column.noSort
                    ?   <SortColumn fieldName={column.name} />
                    : null
                    }
                </Table.HeaderCell>
            );
        });

        if (showId) {
            cols.unshift(
                <Table.HeaderCell key="id-heading">
                    ID
                    <SortColumn fieldName="id" />
                </Table.HeaderCell>
            );
        }

        if (showBulkActions(capabilities)) {
            // add bulk check col
            cols.unshift(<Table.HeaderCell key="bulk-check-heading"><BulkMassCheck /></Table.HeaderCell>);
        }

        if (reorderable) {
            cols.unshift(<Table.HeaderCell key="sort-heading"></Table.HeaderCell>);
        }

        cols.push(<Table.HeaderCell key="button-heading"></Table.HeaderCell>);

        return (
            <Table.Header>
                <Table.Row>{cols}</Table.Row>
            </Table.Header>
        );
    }
};