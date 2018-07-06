import React from 'react';
import PropTypes from 'prop-types';

export default class TextField extends React.PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        disabled: PropTypes.bool
    };

    render() {
        const { name, value, onChange, disabled } = this.props;

        return <input type="text" disabled={disabled} name={name} value={value} onChange={(e) => onChange(e.target.value)} className="form-control" />;
    }
}