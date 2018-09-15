import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchMedia, closeMediaPicker, mediaPickerClickItem, mediaPickerSelectedItem, mediaPickerUpload } from 'redux/actions/media-picker';
import { applyMediaFilters } from 'redux/selectors/media-filtered';
import MediaPicker from './media-picker';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        open: state.mediaPicker.open,
        fetched: state.mediaPicker.fetched,
        fetching: state.mediaPicker.fetching,
        uploading: state.mediaPicker.uploading,
        items: applyMediaFilters(state, ownProps),
        selectedItem: state.mediaPicker.selectedItem
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            fetch: fetchMedia,
            close: closeMediaPicker,
            select: mediaPickerSelectedItem,
            clickItem: mediaPickerClickItem,
            upload: mediaPickerUpload
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaPicker);
