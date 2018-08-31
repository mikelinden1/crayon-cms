import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BulkCheck from './bulk-check';
import { toggleBulkCheckbox } from 'redux/actions/bulk-actions';
import { isBulkCheckChecked } from 'redux/selectors/is-bulk-check-checked';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        checked: isBulkCheckChecked(state, ownProps)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            toggleBulkCheckbox
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BulkCheck);