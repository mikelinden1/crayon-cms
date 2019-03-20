import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getEnvVar } from 'utils/get-env-var';

import { faHome, faTachometerAlt, faSignOutAlt } from '@fortawesome/fontawesome-free-solid';

import {
    Menu,
    Button,
    Icon
  } from 'semantic-ui-react'

// import Icon from 'components/icon';

export default class Header extends React.PureComponent {
    static propTypes = {
        loggedIn: PropTypes.bool.isRequired,
        actions: PropTypes.shape({
            logout: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { loggedIn, actions: { logout } } = this.props;

        const rightSide =   loggedIn
                            ?   <Menu.Item position="right" as={Button} onClick={() => logout()}>
                                    <Icon name="sign-out alternate" />
                                    Logout
                                </Menu.Item>
                            :   null;

        return (
            <Menu fixed='top' inverted>
                <Menu.Item as={Link} to='/'>
                    <Icon name="dashboard" />
                    Admin Dashboard
                </Menu.Item>
                <Menu.Item as='a' href={getEnvVar('siteUrl')}>
                    <Icon name="home" />
                    Site Home
                </Menu.Item>
                {rightSide}
            </Menu>
        );
    }
}