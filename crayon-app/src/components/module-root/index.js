import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router-dom';
import { setModule } from 'redux/actions/set-module';
import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';
import getModuleReduxProp from 'utils/get-module-redux-prop';

import ModuleRoot from './module-root';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        currentModule: getModuleReduxProp(state, 'currentModule'),
        config: getCurrentModuleConfig(state, ownProps)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setModule
        }, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModuleRoot));
