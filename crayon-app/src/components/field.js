import React from 'react';

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
    render() {
        const { type } = this.props;

        const fieldProps = {...this.props};

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
}