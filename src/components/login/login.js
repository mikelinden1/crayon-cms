import React from 'react';
import PropTypes from 'prop-types';

import { Button, Alert } from 'reactstrap';
import Spinner from 'components/spinner';

export default class Login extends React.PureComponent {
    static propTypes = {
        processing: PropTypes.bool,
        error: PropTypes.string,
        actions: PropTypes.shape({
            login: PropTypes.func.isRequired
        }).isRequired
    };

    login(e) {
        e.preventDefault();

        const payload = {
            username: e.target.username.value,
            password: e.target.password.value
        };

        const { actions: { login } } = this.props;

        login(payload);
    }

    render() {
        const { processing, error } = this.props;

        const errorMsg =    error
                            ?   <Alert color="danger">{error}</Alert>
                            :   null;

        const loginBtn =   processing
                            ? <Button color="primary" disabled><Spinner /></Button>
                            : <Button color="primary" type="submit">Login</Button>;

        return (
            <div className="login-wrapper">
                <h1>Login</h1>
                {errorMsg}
                <form onSubmit={(e) => this.login(e)}>
                    <div className="form-group">
                        <label className="control-label">Username</label>
                        <input type="text" name="username" className="form-control" disabled={processing} required={true} />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Password</label>
                        <input type="password" name="password" className="form-control" disabled={processing} required={true} />
                    </div>
                    <div className="text-center">{loginBtn}</div>
                </form>
            </div>
        );
    }
}