import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Spinner from 'components/spinner';

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
        if (val && val.length) {
            output = val.reduce((all, item) => {
                all.push(item.value);
                return all;
            }, []);
        } else {
            output = val ? val.value : '';
        }

        onChange(output);
    }

    render() {
        const { name, value: inputValue, disabled, placeholder: p, options: manualOptions, source, datasources, multiple: m } = this.props;
        const placeholder = p ? p : 'Select...';

        const multiple = m ? m : false;

        if (source && (!datasources[name] || !datasources[name].fetched)) {
            // pull data from external source
            return <div><Spinner /> Loading data</div>;
        }

        let options;
        if (!source) {
            options = manualOptions;
        } else {
            options = datasources[name].data;
        }

        let value = inputValue;
        if (multiple && value && typeof value === 'string') {
            value = JSON.parse(value);
        }


        let selected;

        if (value) {
            if (value.reduce) { // if value has the reduce method it is an array
                selected = value.reduce((selected, val) => {
                    selected.push(options.find((opt) => opt.value === val));
                    return selected;
                }, []);
            } else {
                selected = options.find((opt) => opt.value === value);
            }
        } else {
            selected = multiple ? [] : '';
        }

        return (
            <Select
                disabled={disabled}
                name={name}
                value={selected}
                multi={multiple}
                placeholder={placeholder}
                onChange={(e) => this.handleChange(e)}
                options={options}
            />
        );
    }
}