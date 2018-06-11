import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSort } from 'redux/actions/filters';
import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';
import getModuleReduxProp from 'utils/get-module-redux-prop';

import SortDropdowns from './sort-dropdowns';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        currentSort: getModuleReduxProp(state, 'sort'),
        config: getCurrentModuleConfig(state, ownProps)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setSort
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SortDropdowns);
