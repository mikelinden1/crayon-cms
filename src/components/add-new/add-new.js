import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon } from 'semantic-ui-react';

export default class AddNew extends React.PureComponent {
    static propTypes = {
        displayAsJumbotron: PropTypes.bool,
        config: PropTypes.object.isRequired,
        actions: PropTypes.shape({
            openItemModal: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { displayAsJumbotron, config: { itemName }, actions: { openItemModal } } = this.props;

        if (displayAsJumbotron) {
            return (
                <div className="jumbotron text-center">
                    <p className="lead">
                        <Button color="blue" onClick={() => openItemModal()}>
                            Add The First {itemName}
                        </Button>
                    </p>
                </div>
            );
        }

        return (
            <Button icon color="blue" className="add-new-btn" labelPosition="left" onClick={() => openItemModal()}>
                <Icon name="plus" />
                Add New
            </Button>
        );
    }
}