import React from 'react';
import PropTypes from 'prop-types';

import Field from 'components/field';

export default class FieldMulti extends React.PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        validationErrors: PropTypes.array,
        actions: PropTypes.shape({
            setItemProp: PropTypes.func.isRequired,
            validateOnChange: PropTypes.func.isRequired,
            showMediaPicker: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { name, validationErrors, actions: { setItemProp, validateOnChange, showMediaPicker } } = this.props;
        const fieldProps = {...this.props};

        fieldProps.onChange = (val) => {
            setItemProp(name, val);

            if (validationErrors.length) {
                validateOnChange();
            }
        };

        fieldProps.showMediaPicker = () => {
            showMediaPicker(name);
        };

        return <Field {...fieldProps} />;
    }
}