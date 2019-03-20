import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon } from 'semantic-ui-react';

export default class EditBtn extends React.PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired,
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

        return <Button icon disabled={item.deleting} onClick={() => editItem(item)}><Icon name="pencil" /></Button>;
    }
}