import React from 'react';
import SortColumn from 'components/sort-column';
import BulkMassCheck from 'components/table-view/bulk-mass-check';

import { showBulkActions } from 'utils/show-bulk-actions';

export default class ColumnHeadings extends React.PureComponent {
    render() {
        const { config: { views: { table: { columns: listColumns, showId } }, capabilities } } = this.props;
        const { reorderable } = capabilities;

        const headingStyle = { display:'inline-block', verticalAlign: 'middle' };

        const cols = listColumns.map((column) => {
            const alignment = column.alignment ? `text-${column.alignment}` : 'text-left';
            return (
                <th key={`${column.heading}-heading`} className={alignment}>
                    <div style={headingStyle}>{column.heading}</div>
                    {
                    !column.noSort
                    ?   <SortColumn fieldName={column.name} />
                    : null
                    }
                </th>
            );
        });

        if (showId) {
            cols.unshift(
                <th key="id-heading">
                    <div style={headingStyle}>ID</div>
                    <SortColumn fieldName="id" />
                </th>
            );
        }

        if (showBulkActions(capabilities)) {
            // add bulk check col
            cols.unshift(<th key="bulk-check-heading"><BulkMassCheck /></th>);
        }

        if (reorderable) {
            cols.unshift(<th key="sort-heading"></th>);
        }

        cols.push(<th key="button-heading"></th>);

        return <thead><tr>{cols}</tr></thead>;
    }
};