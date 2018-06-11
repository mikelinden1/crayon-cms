import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { switchView } from 'redux/actions/view-switcher';
import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';

import ViewSwitcher from './view-switcher';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        currentView: state.currentView,
        config: getCurrentModuleConfig(state, ownProps)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            switchView
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewSwitcher);
