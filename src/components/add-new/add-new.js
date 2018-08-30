import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';
import { faPlus } from '@fortawesome/fontawesome-free-solid';

import IconLeft from 'components/icon-left';

export default class AddNew extends React.PureComponent {
    static propTypes = {
        displayAsJumbotron: PropTypes.bool,
        config: PropTypes.shape({
            itemName: PropTypes.string.isRequired
        }).isRequired,
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
                        <Button color="primary" onClick={() => openItemModal()}>
                            Add The First {itemName}
                        </Button>
                    </p>
                </div>
            );
        }

        return (
            <Button color="primary" className="add-new-btn btn-block" onClick={() => openItemModal()}>
                <IconLeft icon={faPlus}>Add New</IconLeft>
            </Button>
        );
    }
}