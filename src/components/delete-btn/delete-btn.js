import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon } from 'semantic-ui-react'

export default class DeleteBtn extends React.PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired,
        config: PropTypes.object.isRequired,
        actions: PropTypes.shape({
            deleteItem: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { item, config, actions: { deleteItem } } = this.props;
        const { capabilities: { deleteable } } = config;

        if (!deleteable) {
            return null;
        }

        return  <Button icon color="red" disabled={item.deleting} loading={item.deleting} onClick={() => deleteItem(item)}><Icon name="trash" /></Button>
    }
}