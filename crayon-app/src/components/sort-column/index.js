import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSort } from 'redux/actions/filters';
import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';

import SortColumn from './sort-column';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        currentSort: state.sort,
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

export default connect(mapStateToProps, mapDispatchToProps)(SortColumn);
