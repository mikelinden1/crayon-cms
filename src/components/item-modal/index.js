import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeItemModal } from 'redux/actions/item-modal';
import { saveNewItem, saveEditItem } from 'redux/actions/items';
import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';
import getModuleReduxProp from 'utils/get-module-redux-prop';

import ItemModal from './item-modal';

function mapStateToProps(state, ownProps) {
    const validationErrors = getModuleReduxProp(state, 'itemModal', 'validationErrors');

    return {
        ...ownProps,
        open: getModuleReduxProp(state, 'itemModal', 'open'),
        error: getModuleReduxProp(state, 'itemModal', 'error'),
        saving: getModuleReduxProp(state, 'itemModal', 'saving'),
        newItem: getModuleReduxProp(state, 'modalItemProps'),
        hasValidationErrors: validationErrors && validationErrors.length,
        editMode: getModuleReduxProp(state, 'modalItemProps', 'id') !== undefined,
        changeMade: getModuleReduxProp(state, 'itemModal', 'changeMade'),
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