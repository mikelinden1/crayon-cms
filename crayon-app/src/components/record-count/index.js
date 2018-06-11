import { connect } from 'react-redux';

import { getFilteredItems } from 'redux/selectors/get-filtered-items';
import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';

import RecordCount from './record-count';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        numOfItemsDisplayed: getFilteredItems(state, ownProps).length,
        numOfItems: state.items.items.length,
        config: getCurrentModuleConfig(state, ownProps)
    };
}

export default connect(mapStateToProps)(RecordCount);
