import React from 'react';
import PropTypes from 'prop-types';

export default class CheckboxField extends React.PureComponent {
    static propTypes = {
        value: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ]).isRequired,
        name: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    };

    render() {
        const { name, value, label, disabled, onChange } = this.props;

        const optionsHtml = (
            <div className="custom-control custom-checkbox" style={{margin: '30px 0'}}>
                <input type="checkbox" disabled={disabled} className="custom-control-input" checked={value} onChange={(e) => onChange(e.target.checked)} id={name} name={name} />
                <label className="custom-control-label" htmlFor={name}>{label}</label>
            </div>
        );

        return optionsHtml;
    }
}