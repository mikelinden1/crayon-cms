import React from 'react';
import PropTypes from 'prop-types';

export default class CheckboxField extends React.PureComponent {
    static propTypes = {
        value: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        name: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    };

    render() {
        const { name, value: inputValue, label, disabled, onChange } = this.props;

        let value = inputValue ? inputValue : false;

        if (typeof value === 'number') {
            value = value === 1 ? true : false;
        }

        const optionsHtml = (
            <div className="custom-control custom-checkbox" style={{margin: '30px 0'}}>
                <input type="checkbox" disabled={disabled} className="custom-control-input" checked={value} onChange={(e) => onChange(e.target.checked)} id={name} name={name} />
                <label className="custom-control-label" htmlFor={name}>{label}</label>
            </div>
        );

        return optionsHtml;
    }
}