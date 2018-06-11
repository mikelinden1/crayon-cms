import React from 'react';
import PropTypes from 'prop-types';
import itemPropShape from 'utils/item-prop-shape';

import { Button } from 'reactstrap'

export default class EditBtn extends React.PureComponent {
    static propTypes = {
        item: PropTypes.shape(itemPropShape()).isRequired,
        actions: PropTypes.shape({
            editItem: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { item, config, actions: { editItem } } = this.props;
        const { capabilities: { editable } } = config;

        if (!editable) {
            return null;
        }

        return <Button color="primary" disabled={item.deleting} onClick={() => editItem(item)}>Edit</Button>;
    }
}