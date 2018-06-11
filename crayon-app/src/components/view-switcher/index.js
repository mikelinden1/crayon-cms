import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { switchView } from 'redux/actions/view-switcher';
import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';
import getModuleReduxProp from 'utils/get-module-redux-prop';

import ViewSwitcher from './view-switcher';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        currentView: getModuleReduxProp(state, 'currentView'),
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
