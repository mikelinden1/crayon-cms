import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';

import RenderPropValue from './render-prop-value';
import { fetchDatasource } from 'redux/actions/data-sources';
import getModuleReduxProp from 'utils/get-module-redux-prop';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        config: getCurrentModuleConfig(state, ownProps),
        datasources: getModuleReduxProp(state, 'datasources'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            fetchDatasource
        }, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(RenderPropValue);
