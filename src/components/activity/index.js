import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { startActivityTracking, activityDetected } from 'redux/actions/activity';

import Activity from './activity';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        active: state.activity.active
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            startActivityTracking,
            activityDetected
        }, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Activity));
