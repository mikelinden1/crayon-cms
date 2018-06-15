import React from 'react';
import PropTypes from 'prop-types';

import Field from 'components/field';

export default class FieldMulti extends React.PureComponent {
    static propTypes = {
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        helpText: PropTypes.string,
        validationErrors: PropTypes.array,
        disabled: PropTypes.bool,
        actions: PropTypes.shape({
            setItemProp: PropTypes.func.isRequired,
            validateOnChange: PropTypes.func.isRequired,
            showMediaPicker: PropTypes.func.isRequired
        }).isRequired
    };

    getField() {
        const { type, name, validationErrors, actions: { setItemProp, validateOnChange, showMediaPicker } } = this.props;

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

    render() {
        const { label, type, helpText: help, validationErrors } = this.props;

        let field = this.getField();

        if (type === 'checkbox') {
            return field;
        }

        const fieldClasses = ['form-group'];

        let errorText = '';
        if (validationErrors.length) {
            fieldClasses.push('has-error');
            const errorTextP = validationErrors.map((e, i) => <p key={`errormsg-${e.itemName}-${i}`}>{e.msg}</p>);

            errorText = <div className="invalid-feedback">{errorTextP}</div>;
        }

        const helpText = help ? <p><small><em>{help}</em></small></p> : null;

        return (
            <div className={fieldClasses.join(' ')}>
                <label className="control-label">{label}</label>
                {field}
                {helpText}
                {errorText}
            </div>
        );
    }
}