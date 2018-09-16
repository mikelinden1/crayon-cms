import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { mediaToggleNameEdit, mediaSaveName, mediaSetNewName } from 'redux/actions/media-picker';

import MediaName from './media-name';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        selectedItem: state.mediaPicker.selectedItem,
        editing: state.mediaPicker.editingTitle,
        saving: state.mediaPicker.savingName,
        newName: state.mediaPicker.newName
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            toggleEdit: mediaToggleNameEdit,
            save: mediaSaveName,
            setNewName: mediaSetNewName
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaName);
