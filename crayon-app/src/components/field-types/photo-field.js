import React from 'react';
import PropTypes from 'prop-types';

import config from 'config';
import { Button } from 'reactstrap';

export default class TextField extends React.PureComponent {
    static propTypes = {
        value: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        showMediaPicker: PropTypes.func.isRequired,
        disabled: PropTypes.bool
    };

    render() {
        const { name, value, disabled, onChange, showMediaPicker } = this.props;
        console.log('value in photo', value);
        const protocolRegex = /(http(s?)):\/\//gi;
        const previewImage = protocolRegex.test(value) ? value : `${config.uploadFullPath}/${value}`;

        return (
            <div className="photo-field input-group">
                {
                value && value !== ''
                ?   <span className="input-group-btn">
                        <img src={previewImage} alt="Preview" className="photo-picker-thumb" />
                    </span>
                :   null
                }
                <input
                    disabled={disabled}
                    type="text"
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="form-control"
                />
                <span className="input-group-btn">
                    <Button color="primary" className="btn-sm" disabled={disabled} onClick={() => showMediaPicker()}>Select</Button>
                </span>
            </div>
        );
    }
}