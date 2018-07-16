import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import getModuleReduxProp from 'utils/get-module-redux-prop';
import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';

import { setItemsPerPage } from 'redux/actions/paginator';

import ItemsPerPage from './items-per-page';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        itemsPerPage: getModuleReduxProp(state, 'paginator', 'itemsPerPage'),
        config: getCurrentModuleConfig(state, ownProps)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setItemsPerPage
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPerPage);
