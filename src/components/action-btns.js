import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'semantic-ui-react';
import EditBtn from 'components/edit-btn';
import DeleteBtn from 'components/delete-btn';

export default class ActionBtns extends React.PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired
    };

    render() {
        const { item } = this.props;

        return (
            <Button.Group>
                <EditBtn item={item} />
                <DeleteBtn item={item} />
            </Button.Group>
        );
    }
}