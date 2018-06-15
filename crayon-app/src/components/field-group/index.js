import { connect } from 'react-redux';

import { getPropValue } from 'redux/selectors/get-prop-value';
import { getPropValidationErrors } from 'redux/selectors/get-prop-validation-errors';

import FieldGroup from './field-group';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        value: getPropValue(state, ownProps),
        validationErrors: getPropValidationErrors(state, ownProps)
    };
}

export default connect(mapStateToProps)(FieldGroup);
