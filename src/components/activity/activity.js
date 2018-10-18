import React from 'react';
import PropTypes from 'prop-types';

export default class Activity extends React.PureComponent {
    static propTypes = {
        active: PropTypes.bool.isRequired,
        actions: PropTypes.shape({
            startActivityTracking: PropTypes.func.isRequired,
            activityDetected: PropTypes.func.isRequired
        }).isRequired
    };

    componentWillMount() {
        const { actions: { startActivityTracking, activityDetected } } = this.props;

        startActivityTracking();
        window.onclick = window.onmousemove = activityDetected;
    }

    render() {
        const { active } = this.props;

        if (!active) {
            return <p>Inactive</p>
        }
        return <p>Active</p>;
    }
}