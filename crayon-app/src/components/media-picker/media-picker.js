import React from 'react';
import PropTypes from 'prop-types';
import config from 'config';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Spinner from 'components/spinner';

export default class MediaPicker extends React.PureComponent {
    static propTypes = {
        open: PropTypes.bool,
        fetched: PropTypes.bool,
        fetching: PropTypes.bool,
        items: PropTypes.array,
        actions: PropTypes.shape({
            close: PropTypes.func.isRequired,
            select: PropTypes.func.isRequired,
            clickItem: PropTypes.func.isRequired,
            fetch: PropTypes.func.isRequired
        }).isRequired
    };

    componentWillMount() {
        const { actions: { fetch } } = this.props;
        fetch();
    }

    mapMedia() {
        const { items, selectedItem, actions: { clickItem } } = this.props;

        return items.map((item) => {
            const classes = ['media-item'];

            if (selectedItem && selectedItem.id === item.id) {
                classes.push('selected');
            }
            return (
                <div key={`media-item-${item.id}`} onClick={() => clickItem(item)} className={classes.join(' ')}>
                    <img src={`${config.uploadFullPath}/${item.filename}`} alt="Media picker item" />
                </div>
            );
        });
    }

    render() {
        const { fetched, open, selectedItem, actions: { close, select } } = this.props;

        if (!fetched) {
            return <p><Spinner /> Loading media...</p>;
        }

        return (
            <Modal className="media-picker" isOpen={open} toggle={() => close()}>
                <ModalHeader toggle={() => close()}>
                    Media Picker
                </ModalHeader>
                <ModalBody>
                    <div className="media-grid">
                        {this.mapMedia()}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => select(selectedItem.filename)} disabled={!selectedItem}>Select</Button>
                    <Button color="secondary" onClick={() => close()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}