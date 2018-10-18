import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router-dom';

import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';
import { fetchItems, startPolling, stopPolling } from 'redux/actions/items';
import getModuleReduxProp from 'utils/get-module-redux-prop';

import Module from './module';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        fetched: getModuleReduxProp(state, 'items', 'fetched'),
        fetching: getModuleReduxProp(state, 'items', 'fetching'),
        error: getModuleReduxProp(state, 'items', 'error'),
        config: getCurrentModuleConfig(state, ownProps),
        currentModule: state.currentModule
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            fetchItems,
            startPolling,
            stopPolling
        }, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Module));
