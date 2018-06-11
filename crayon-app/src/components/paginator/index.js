import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getFilteredItems } from 'redux/selectors/get-filtered-items';
import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';

import { setCurrentPage } from 'redux/actions/paginator';

import Paginator from './paginator';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        currentPage: state.paginator.currentPage,
        numOfItems: getFilteredItems(state, ownProps).length,
        config: getCurrentModuleConfig(state, ownProps)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setCurrentPage
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginator);
