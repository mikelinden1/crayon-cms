import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchDatasource } from 'redux/actions/data-sources';
import { setFilter } from 'redux/actions/filters';
import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';
import getModuleReduxProp from 'utils/get-module-redux-prop';

import Filter from './filter';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        datasources: getModuleReduxProp(state, 'datasources'),
        filterVals: getModuleReduxProp(state, 'filters'),
        currentModule: state.currentModule,
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
