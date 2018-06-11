import React from 'react';
import config from 'config';
import SortColumn from 'components/sort-column';

export default class ColumnHeadings extends React.PureComponent {
    render() {
        const { views: { table: { columns: listColumns, showId } }, capabilities: { reorderable } } = config;

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

        if (reorderable) {
            cols.unshift(<th key="sort-heading"></th>);
        }

        cols.push(<th key="button-heading"></th>);

        return <thead><tr>{cols}</tr></thead>;
    }
};