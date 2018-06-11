import React from 'react';
import PropTypes from 'prop-types';
import itemPropShape from 'utils/item-prop-shape';

import { Button } from 'reactstrap'
import Spinner from 'components/spinner';

export default class DeleteBtn extends React.PureComponent {
    static propTypes = {
        item: PropTypes.shape(itemPropShape()).isRequired,
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

        return  item.deleting
                ? <Button color="danger" disabled={true}><Spinner /></Button>
                : <Button color="danger" onClick={() => deleteItem(item)}>Delete</Button>;
    }
}