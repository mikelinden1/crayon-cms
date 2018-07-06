import React from 'react';
import PropTypes from 'prop-types';

export default class RadioField extends React.PureComponent {
    static propTypes = {
        value: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        })),
        onChange: PropTypes.func.isRequired,
        disabled: PropTypes.bool
    };

    render() {
        const { name, value, disabled, options, onChange } = this.props;

        const optionsHtml = options.map((option, i) => {
            const { label: optionLabel, value: optionValue } = option;

            const id = `${optionValue}-id`;

            return (
                <div key={`${id}-field`} className="custom-control custom-radio">
                    <input type="radio" disabled={disabled} id={id} onChange={(e) => onChange(optionValue)} checked={value === optionValue} name={name} className="custom-control-input" value={optionValue} />
                    <label className="custom-control-label" htmlFor={id}>{optionLabel}</label>
                </div>
            );
        });

        return optionsHtml;
    }
}