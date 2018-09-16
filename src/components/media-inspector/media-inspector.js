import React from 'react';
import PropTypes from 'prop-types';
import { getEnvVar } from 'utils/get-env-var';
import { Button } from 'reactstrap';
import Spinner from 'components/spinner';

export default class MediaInspector extends React.PureComponent {
    static propTypes = {
        selectedItem: PropTypes.object,
        deletingId: PropTypes.number,
        actions: PropTypes.shape({
            deleteMedia: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { selectedItem, deletingId, actions: { deleteMedia } } = this.props;

        if (!selectedItem) {
            return <div className="media-inspector empty"><p><em>Select a photo to inspect.</em></p></div>;
        }

        const deleteBtnText = deletingId === selectedItem.id ? <Spinner /> : <span>Delete</span>;

        return (
            <div className="media-inspector">
                <img src={`${getEnvVar('uploadFullPath')}/thumb_${selectedItem.filename}`} alt="Media inspector" />
                <div className="media-info">
                    <h3>{selectedItem.filename}</h3>
                    <label>Uploaded By</label>
                    <p>{selectedItem.uploaded_by}</p>
                    <label>Uploaded On</label>
                    <p>{selectedItem.upload_date}</p>
                    <label>Module</label>
                    <p>{selectedItem.module}</p>
                    <label>Original filename</label>
                    <p>{selectedItem.uploaded_as}</p>
                </div>
                <div className="delete">
                    <Button color="danger" className="btn-lg" disabled={deletingId === selectedItem.id} onClick={() => deleteMedia(selectedItem.id)}>{deleteBtnText}</Button>
                </div>
            </div>
        );
    }
}