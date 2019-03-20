import { connect } from 'react-redux';

import { getFilteredAndPaginatedItems } from 'redux/selectors/get-filtered-and-paginated-items';
import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';
import getModuleReduxProp from 'utils/get-module-redux-prop';

import RecordCount from './record-count';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        numOfItemsDisplayed: getFilteredAndPaginatedItems(state, ownProps).length,
        numOfItems: getModuleReduxProp(state, 'items', 'items').length,
        config: getCurrentModuleConfig(state, ownProps)
    };
}

export default connect(mapStateToProps)(RecordCount);
