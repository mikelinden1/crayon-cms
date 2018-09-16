import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deleteMedia } from 'redux/actions/media-picker';

import MediaInspector from './media-inspector';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        selectedItem: state.mediaPicker.selectedItem,
        deletingId: state.mediaPicker.deletingId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            deleteMedia
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaInspector);
