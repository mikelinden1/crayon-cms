import React from 'react';
import PropTypes from 'prop-types';

import { getEnvVar } from 'utils/get-env-var';

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

    componentWillMount() {
        this.loadPreview(this.props);
        this.setState({ previewImage: null });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.loadPreview(nextProps);
        }
    }

    loadPreview(props) {
        const { value } = props;

        const protocolRegex = /(http(s?)):\/\//gi;
        const previewImage = protocolRegex.test(value) ? value : `${getEnvVar('uploadFullPath')}/${value}`;

        const img = new Image();
        img.src = previewImage;
        img.onload = () => this.setState({ previewImage });
        img.onerror = () => this.setState({ previewImage: null });
    }

    render() {
        const { name, value, disabled, onChange, showMediaPicker } = this.props;

        const { previewImage } = this.state;

        return (
            <div className="photo-field input-group">
                {
                previewImage && previewImage !== ''
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
                    <Button color="primary" className="btn-sm" disabled={disabled} onClick={() => showMediaPicker(onChange)}>Select</Button>
                </span>
            </div>
        );
    }
}