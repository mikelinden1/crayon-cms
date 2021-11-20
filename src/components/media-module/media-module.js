import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone'

import { getEnvVar } from 'utils/get-env-var';

import Spinner from 'components/spinner';
import MediaFilters from 'components/media-filters';
import MediaInspector from 'components/media-inspector';

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
        const { items, selectedItem, actions: { clickItem } } = this.props;

        return items.map((item) => {
            const classes = ['media-item'];

            if (selectedItem && selectedItem.id === item.id) {
                classes.push('selected');
            }

            if (item.filename.includes('.pdf')) {
                classes.push('non-image');
                return (
                    <div key={`media-item-${item.id}`} onClick={() => clickItem(item)} className={classes.join(' ')}>
                        <div className="icon"><Icon icon={faFilePdf} /></div>
                        {item.filename}
                    </div>
                );
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

        const text = uploading ? <div><Spinner /></div> : <div>Drag files here or click to select</div>;

        return (
            <Dropzone className="file-drop-zone" disabled={uploading} acceptStyle={{border: '2px solid green'}} onDrop={(files) => upload(files)}>
                {text}
            </Dropzone>
        );
    }

    render() {
        const { fetched } = this.props;

        if (!fetched) {
            return <p><Spinner /> Loading media...</p>;
        }

        return (
            <div className="media-module">
                <div className="media-browser">
                    <MediaFilters />
                    <div className="media-grid">
                        {this.displayDropZone()}
                        {this.mapMedia()}
                    </div>
                </div>
                <MediaInspector />
            </div>
        );
    }
}