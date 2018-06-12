import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openItemModal } from 'redux/actions/item-modal';
import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';

import Header from './header';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        config: getCurrentModuleConfig(state, ownProps)
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
