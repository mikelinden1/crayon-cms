import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeItemModal } from 'redux/actions/item-modal';
import { saveNewItem, saveEditItem } from 'redux/actions/items';
import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';

import ItemModal from './item-modal';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        open: state.itemModal.open,
        error: state.itemModal.error,
        saving: state.itemModal.saving,
        newItem: state.modalItemProps,
        hasValidationErrors: state.itemModal.validationErrors && state.itemModal.validationErrors.length,
        editMode: state.modalItemProps.id !== undefined,
        changeMade: state.itemModal.changeMade,
        currentModule: state.currentModule,
        config: getCurrentModuleConfig(state, ownProps)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            closeItemModal,
            saveNewItem,
            saveEditItem
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemModal);