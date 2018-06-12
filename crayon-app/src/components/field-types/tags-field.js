import React from 'react';
import PropTypes from 'prop-types';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

export default class TagsField extends React.PureComponent {
    static propTypes = {
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array
        ]).isRequired,
        onChange: PropTypes.func.isRequired,
        disabled: PropTypes.bool
    };

    render() {
        const { value: inputValue, disabled, onChange } = this.props;
        let value = inputValue ? inputValue : [];

        if (typeof value === 'string') {
            value = JSON.parse(value);
        }

        return <TagsInput disabled={disabled} value={value} onChange={(val) => onChange(val)} />;
    }
}