import React from 'react';

import { Message, Table } from 'semantic-ui-react';

import BulkActionApply from './bulk-action-apply';
import TableHeader from './table-header';
import TableBody from './table-body';

export default class TableView extends React.PureComponent {
    render() {
        const { config: { views: { table: tableConfig } } } = this.props;

        if (!tableConfig) {
            console.error('Missing table view config');
            return <Message error>Missing table view config</Message>;
        }

        return (
            <div>
                <BulkActionApply />
                <Table striped>
                    <TableHeader />
                    <TableBody />
                </Table>
            </div>
        );
    }
}