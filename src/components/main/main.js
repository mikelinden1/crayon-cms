import React from 'react';
import PropTypes from 'prop-types';

import { Switch, Route } from 'react-router-dom'
import config from 'config';

import { getCookie } from 'utils/get-cookie';

import Spinner from 'components/spinner';
import Login from 'components/login';

import Homepage from 'components/homepage';
import MediaModule from 'components/media-module';
import ModuleRoot from 'components/module-root';
import MediaPicker from 'components/media-picker';
import Activity from 'components/activity';

export default class Main extends React.PureComponent {
    static propTypes = {
        actions: PropTypes.shape({
            validateJwt: PropTypes.func.isRequired
        }).isRequired
    };

    componentWillMount() {
        const jwt = getCookie('usr');

        if (jwt) {
            const { actions: { validateJwt } } = this.props;
            validateJwt(jwt);
        }
    }

    render() {
        const { loggedIn, validatingJwt } = this.props;

        if (validatingJwt) {
            return <p><Spinner /> Logging in...</p>;
        }

        if (!loggedIn) {
            return <Login />;
        }

        return (
            <div className="loggedin">
                <Switch>
                    <Route exact path='/' render={(props) => <Homepage />} />
                    <Route exact path='/media' render={(props) => <MediaModule />} />
                    {config.moduleOrder.map((moduleId) => {
                        return <Route key={`module-route-${moduleId}`} exact path={`/${moduleId}`} render={(props) => <ModuleRoot moduleId={moduleId} {...props} />} />;
                    })}
                </Switch>
                <MediaPicker />
                <Activity />
            </div>
        );
    }
}