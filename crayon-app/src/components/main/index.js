import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { validateJwt } from 'redux/actions/user';

import Main from './main';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        validatingJwt: state.userState.validatingJwt,
        loggedIn: state.userState.loggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            validateJwt
        }, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
