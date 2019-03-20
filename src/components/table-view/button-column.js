import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'semantic-ui-react';
import ActionBtns from 'components/action-btns';

export default class ButtonColumn extends React.PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired
    };

    render() {
        const { item } = this.props;

        return (
            <Table.Cell key={`${item.id}-buttons`} textAlign="right">
                <ActionBtns item={item} />
            </Table.Cell>
        );
    }
};