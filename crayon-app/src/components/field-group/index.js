import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getPropValue } from 'redux/selectors/get-prop-value';
import { getPropValidationErrors } from 'redux/selectors/get-prop-validation-errors';
import { showMediaPicker } from 'redux/actions/media-picker';

import FieldGroup from './field-group';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        value: getPropValue(state, ownProps),
        validationErrors: getPropValidationErrors(state, ownProps)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            showMediaPicker
        }, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(FieldGroup);
