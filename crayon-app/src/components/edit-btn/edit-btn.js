import React from 'react';
import PropTypes from 'prop-types';
import itemPropShape from 'utils/item-prop-shape';

import { Button } from 'reactstrap'
import config from 'config';

export default class EditBtn extends React.PureComponent {
    static propTypes = {
        item: PropTypes.shape(itemPropShape()).isRequired,
        actions: PropTypes.shape({
            editItem: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { capabilities: { editable } } = config;

        if (!editable) {
            return null;
        }

        const { item, actions: { editItem } } = this.props;

        return <Button color="primary" disabled={item.deleting} onClick={() => editItem(item)}>Edit</Button>;
    }
}