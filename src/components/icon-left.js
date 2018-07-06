import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';

export default class IconLeft extends React.PureComponent {
    static propTypes = {
        icon: PropTypes.object.isRequired,
        children: PropTypes.any
    };

    render() {
        const { icon, children: text } = this.props;

        return <div className="icon-left"><Icon icon={icon} /> {text}</div>;
    }
}