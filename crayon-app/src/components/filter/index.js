import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchDatasource } from 'redux/actions/data-sources';
import { setFilter } from 'redux/actions/filters';
import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';

import Filter from './filter';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        datasources: state.datasources,
        filterVals: state.filters,
        config: getCurrentModuleConfig(state, ownProps)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            fetchDatasource,
            setFilter
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
