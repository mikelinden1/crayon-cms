import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import config from 'config';

import { faHome, faTachometerAlt, faSignOutAlt } from '@fortawesome/fontawesome-free-solid';

import Icon from 'components/icon';

export default class Header extends React.PureComponent {
    static propTypes = {
        loggedIn: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
        actions: PropTypes.shape({
            openItemModal: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { loggedIn, user } = this.props;
        const userName = user ? (user.name ? user.name : null) : null;

        const rightSide =   loggedIn
                            ?   <div style={{display:'flex'}}>
                                    <div className="welcome">Hi, {userName}!</div>
                                    <button onClick={() => window.alert('Logout')}><Icon icon={faSignOutAlt} /> Logout</button>
                                </div>
                            :   null;

        return (
            <div>
                <header id="top-bar">
                    <Link to='/'><Icon icon={faTachometerAlt} /> Admin Dashboard</Link>
                    <a href={config.siteUrl}><Icon icon={faHome} /> Site Home</a>
                    <div className="grow" />
                    {rightSide}
                </header>
                <div id="header-pad" />
            </div>
        );
    }
}