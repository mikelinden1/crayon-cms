import React from 'react';

import { Alert } from 'reactstrap';

import TableHeader from './table-header';
import TableBody from './table-body';

export default class TableView extends React.PureComponent {
    render() {
        const { config: { views: { table: tableConfig } } } = this.props;

        if (!tableConfig) {
            console.error('Missing table view config');
            return <Alert color="danger">Missing table view config</Alert>;
        }

        return (
            <table className="table table-striped">
                <TableHeader />
                <TableBody />
            </table>
        );
    }
}