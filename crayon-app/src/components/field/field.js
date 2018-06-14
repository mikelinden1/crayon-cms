import React from 'react';
import PropTypes from 'prop-types';

import {
    TextField,
    PasswordField,
    DropdownField,
    RadioField,
    PhotoField,
    DatepickerField,
    CheckboxField,
    TextAreaField,
    RteField,
    TagsField
} from 'components/field-types';

export default class Field extends React.PureComponent {
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
        const { type, name, validationErrors, actions: { setItemProp, validateOnChange, showMediaPicker, mediaPickerSelectedItem } } = this.props;

        const fieldProps = {...this.props};

        fieldProps.onChange = (val) => {
            setItemProp(name, val);

            if (validationErrors.length) {
                validateOnChange();
            }
        };

        fieldProps.showMedia = () => {
            showMediaPicker(name);

            setTimeout(() => mediaPickerSelectedItem('test.png'), 2000);
        };

        switch (type) {
            case 'text':
                return <TextField {...fieldProps} />;
            case 'password':
                return <PasswordField {...fieldProps} />;
            case 'dropdown':
                return <DropdownField {...fieldProps} />;
            case 'radio':
                return <RadioField {...fieldProps} />;
            case 'photo':
                return <PhotoField {...fieldProps} />;
            case 'datepicker':
                return <DatepickerField {...fieldProps} />;
            case 'checkbox':
                return <CheckboxField {...fieldProps} />;
            case 'textarea':
                return <TextAreaField {...fieldProps} />;
            case 'tags':
                return <TagsField {...fieldProps} />;
            case 'rte':
                return <RteField {...fieldProps} />;
            default:
                return null;
        }
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