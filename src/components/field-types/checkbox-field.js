import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'semantic-ui-react';

export default class CheckboxField extends React.PureComponent {
    static propTypes = {
        value: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        disabled: PropTypes.bool,
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    };

    render() {
        const { value: inputValue, label, disabled, onChange } = this.props;

        let value = inputValue ? inputValue : false;

        if (typeof value === 'number') {
            value = value === 1 ? true : false;
        }

        return <Checkbox checked={value} onChange={(e,v) => onChange(v.checked)} disabled={disabled} label={label} />;
    }
}