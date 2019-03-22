import React from 'react';
import PropTypes from 'prop-types';

import { Radio, Form } from 'semantic-ui-react';

export default class RadioField extends React.PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
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

            return (
                <Radio
                    key={`${name}-${optionValue}`}
                    label={optionLabel}
                    disabled={disabled}
                    checked={value === optionValue}
                    value={optionValue}
                    onChange={(e, v) => onChange(v.value)}
                />
            );
        });

        return (
            <Form.Group inline>
                {optionsHtml}
            </Form.Group>
        );
    }
}