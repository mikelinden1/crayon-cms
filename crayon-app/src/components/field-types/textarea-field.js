import React from 'react';
import PropTypes from 'prop-types';

export default class TextareaField extends React.PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        disabled: PropTypes.bool
    };

    render() {
        const { name, value, rows: r, disabled, onChange } = this.props;
        const rows = r ? r : 4;

        return <textarea name={name} rows={rows} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} className="form-control" />;
    }
}