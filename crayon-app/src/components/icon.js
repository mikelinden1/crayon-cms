import React from 'react';
import PropTypes from 'prop-types';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'

export default class Icon extends React.PureComponent {
    static propTypes = {
        icon: PropTypes.object.isRequired
    };

    render() {
        const { icon } = this.props;

        return <FontAwesomeIcon icon={icon} />;
    }
}