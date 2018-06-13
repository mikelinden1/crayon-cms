import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { login } from 'redux/actions/user';

import Login from './login';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        processing: state.userState.loggingIn,
        error: state.userState.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            login
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
