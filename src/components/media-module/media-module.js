import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone'

import { getEnvVar } from 'utils/get-env-var';

import Spinner from 'components/spinner';
import MediaFilters from 'components/media-filters';

export default class MediaModule extends React.PureComponent {
    static propTypes = {
        open: PropTypes.bool,
        fetched: PropTypes.bool,
        fetching: PropTypes.bool,
        items: PropTypes.array,
        actions: PropTypes.shape({
            close: PropTypes.func.isRequired,
            select: PropTypes.func.isRequired,
            clickItem: PropTypes.func.isRequired,
            fetch: PropTypes.func.isRequired,
            upload: PropTypes.func.isRequired,
            setModule: PropTypes.func.isRequired
        }).isRequired
    };

    componentWillMount() {
        const { actions: { fetch, setModule } } = this.props;
        fetch();
        setModule('media');
    }

    mapMedia() {
        const { fetched, items, selectedItem, actions: { clickItem } } = this.props;

        if (!fetched) {
            return <p><Spinner /> Loading media...</p>;
        }

        return items.map((item) => {
            const classes = ['media-item'];

            if (selectedItem && selectedItem.id === item.id) {
                classes.push('selected');
            }
            return (
                <div key={`media-item-${item.id}`} onClick={() => clickItem(item)} className={classes.join(' ')}>
                    <img src={`${getEnvVar('uploadFullPath')}/thumb_${item.filename}`} alt="Media picker item" />
                </div>
            );
        });
    }
    
    displayDropZone() {
        const { uploading, actions: { upload } } = this.props;

        return (
            <Dropzone className="file-drop-zone" disabled={uploading} acceptStyle={{border: '2px solid green'}} onDrop={(files) => upload(files)}>
                <div>Drag files here or click to select</div>
            </Dropzone>
        );
    }

    displayInspector() {
        const { selectedItem } = this.props;

        if (selectedItem) {
            // show controls
            console.log('selected item', selectedItem);
        } else {
            return <p><em>Select a photo to inspect.</em></p>
        }
    }
    render() {
        return (
            <div className="media-module">
                <div className="media-browser">
                    <MediaFilters />
                    <div className="media-grid">
                        {this.displayDropZone()}
                        {this.mapMedia()}
                    </div>
                </div>
                <div className="media-inspector">
                    {this.displayInspector()}
                </div>
            </div>
        );
    }
}