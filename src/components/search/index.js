import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSearch } from 'redux/actions/filters';
import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';
import getModuleReduxProp from 'utils/get-module-redux-prop';

import Search from './search';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        search: getModuleReduxProp(state, 'search', 'terms'),
        config: getCurrentModuleConfig(state, ownProps)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setSearch
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
