import React from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export default class DatepickerField extends React.PureComponent {
    static propTypes = {
        value: PropTypes.string.isRequired,
        showTime: PropTypes.bool,
        timeInterval: PropTypes.number,
        disabled: PropTypes.bool,
        onChange: PropTypes.func.isRequired
    };

    handleChange(e) {
        const { onChange } = this.props;

        const val = e && e.format ? e.format() : '';

        onChange(val);
    }
    render() {
        const { value, disabled, showTime, timeInterval } = this.props;

        const selected = value && value.length ? moment.utc(value) : null;
        const tInterval = timeInterval ? timeInterval : 30;

        return (
            <DatePicker
                disabled={disabled}
                className="form-control"
                selected={selected}
                onChange={(e) => this.handleChange(e)}
                onChangeRaw={(e) => this.handleChange(e)}
                showTimeSelect={showTime}
                timeIntervals={tInterval}
                dateFormat="LLL"
            />
        );
    }
}