import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logout } from 'redux/actions/user';

import Header from './header';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        loggedIn: state.userState.loggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            logout
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
