import React from 'react';
import PropTypes from 'prop-types';

export default class PasswordField extends React.PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        disabled: PropTypes.bool
    };

    componentWillMount() {
        this.setState({ showPassword: false });
    }

    toggleShowPassword() {
        this.setState({ showPassword: !this.state.showPassword });
    }

    render() {
        const { name, value, onChange, disabled } = this.props;
        const { showPassword } = this.state;

        return (
            <div className="row">
                <div className="col-md-9">
                    <input type={showPassword ? 'text' : 'password'} disabled={disabled} name={name} value={value} onChange={(e) => onChange(e.target.value)} className="form-control" />
                </div>
                <div className="col-md-3">
                    <div className="custom-control custom-checkbox" style={{marginTop: '10px'}}>
                        <input type="checkbox" disabled={disabled} className="custom-control-input" checked={showPassword} onChange={(e) => this.toggleShowPassword()} id="show-password" name="show-password" />
                        <label className="custom-control-label" htmlFor="show-password">Show Password</label>
                    </div>
                </div>
            </div>
        );
    }
}