import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BulkActionApply from './bulk-action-apply';
import { selectBulkAction, applyBulkAction } from 'redux/actions/bulk-actions';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        selectedItems: state[state.currentModule].bulkActions.selectedItems,
        selectedAction: state[state.currentModule].bulkActions.selectedAction
    };
}

function mapDispatchToActions(dispatch) {
    return {
        actions: bindActionCreators({
            selectBulkAction,
            applyBulkAction
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToActions)(BulkActionApply);