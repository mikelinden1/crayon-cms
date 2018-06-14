import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

export default class TextField extends React.PureComponent {
    static propTypes = {
        value: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        showMedia: PropTypes.func.isRequired,
        disabled: PropTypes.bool
    };


    render() {
        const { name, value, disabled, onChange, showMedia } = this.props;

        return (
            <div className="photo-field input-group">
                {
                value && value !== ''
                ?   <span className="input-group-btn">
                        <img src={value} alt="Preview" className="photo-picker-thumb" />
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
                    <Button color="primary" className="btn-sm" disabled={disabled} onClick={() => showMedia()}>Upload</Button>
                </span>
            </div>
        );
    }
}