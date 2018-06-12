import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openItemModal } from 'redux/actions/item-modal';

import Header from './header';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        user: state.userState.user,
        loggedIn: state.userState.loggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            openItemModal
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
