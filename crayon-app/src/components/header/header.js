import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import config from 'config';

import { faHome, faTachometerAlt, faSignOutAlt } from '@fortawesome/fontawesome-free-solid';

import Icon from 'components/icon';

export default class AddNew extends React.PureComponent {
    static propTypes = {
        config: PropTypes.object.isRequired,
        actions: PropTypes.shape({
            openItemModal: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        return (
            <div>
                <header id="top-bar">
                    <a href={config.siteUrl}><Icon icon={faHome} /> Site Home</a>
                    <Link to='/'><Icon icon={faTachometerAlt} /> Admin Dashboard</Link>
                    <div className="grow" />
                    <div className="welcome">Hi, Mike!</div>
                    <button onClick={() => window.alert('Logout')}><Icon icon={faSignOutAlt} /> Logout</button>
                </header>
                <div id="header-pad" />
            </div>
        );
    }
}