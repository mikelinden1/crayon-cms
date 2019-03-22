import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

export default class DropdownField extends React.PureComponent {
    static propTypes = {
        value: PropTypes.any.isRequired,
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        source: PropTypes.shape({
            url: PropTypes.string.isRequired,
            labelKey: PropTypes.string.isRequired,
            valueKey: PropTypes.string.isRequired
        }),
        datasources: PropTypes.object,
        options: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })),
        multiple: PropTypes.bool,
        onChange: PropTypes.func.isRequired
    };

    componentWillMount() {
        const { name, source, datasources, actions: { fetchDatasource } } = this.props;

        if (source && !datasources[name]) {
            fetchDatasource(name, source);
        }
    }

    handleChange(val) {
        const { onChange } = this.props;

        let output;
        if (val && val.reduce) {
            output = val.length ? val : null;
        } else {
            output = val;
        }

        onChange(output);
    }

    render() {
        const { name, value: inputValue, disabled, placeholder: p, options: manualOptions, source, datasources, multiple: m } = this.props;
        const placeholder = p ? p : 'Select...';

        const multiple = m ? m : false;

        const loading = source && (!datasources[name] || !datasources[name].fetched);

        let options;
        if (!source) {
            options = manualOptions;
        } else {
            options = loading ? [] : datasources[name].data;
        }

        let value = inputValue;
        if (multiple) {
            if (!value || value === '') {
                value = [];
            }

            if (typeof value === 'string') {
                value = JSON.parse(value);
            }
        }

        // map options for semantic UI 
        options = options.map(opt => {
            return {
                key: opt.value,
                value: opt.value,
                text: opt.label
            };
        });

        return (
            <Dropdown
                placeholder={placeholder}
                fluid
                selection
                clearable
                closeOnChange
                loading={loading}
                disabled={disabled}
                multiple={multiple}
                search={multiple}
                options={options}
                value={value}
                onChange={(e, data) => this.handleChange(data.value)}
            />
        );
    }
}