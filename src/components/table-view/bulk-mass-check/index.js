import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BulkMassCheck from './bulk-mass-check';
import { toggleAllBulkCheckboxes } from 'redux/actions/bulk-actions';
import { isAllBulkCheckChecked } from 'redux/selectors/is-bulk-check-checked';
import { getFilteredItems } from 'redux/selectors/get-filtered-items';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        checked: isAllBulkCheckChecked(state, ownProps),
        items: getFilteredItems(state, ownProps)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            toggleAllBulkCheckboxes
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BulkMassCheck);