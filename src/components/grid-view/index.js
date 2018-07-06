import { connect } from 'react-redux';

import { getFilteredAndPaginatedItems } from 'redux/selectors/get-filtered-and-paginated-items';
import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';

import GridView from './grid-view';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        items: getFilteredAndPaginatedItems(state, ownProps),
        config: getCurrentModuleConfig(state, ownProps)
    };
}

export default connect(mapStateToProps)(GridView);
