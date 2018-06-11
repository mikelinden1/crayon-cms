import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router-dom';

import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';
import { fetchItems } from 'redux/actions/items';

import Module from './module';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        fetched: state.items.fetched,
        fetching: state.items.fetching,
        error: state.items.error,
        config: getCurrentModuleConfig(state, ownProps)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            fetchItems
        }, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Module));
