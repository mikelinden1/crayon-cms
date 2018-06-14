import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchMedia, closeMediaPicker, mediaPickerClickItem, mediaPickerSelectedItem } from 'redux/actions/media-picker';

import MediaPicker from './media-picker';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        open: state.mediaPicker.open,
        fetched: state.mediaPicker.fetched,
        fetching: state.mediaPicker.fetching,
        items: state.mediaPicker.items,
        selectedItem: state.mediaPicker.selectedItem
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            fetch: fetchMedia,
            close: closeMediaPicker,
            select: mediaPickerSelectedItem,
            clickItem: mediaPickerClickItem
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaPicker);
