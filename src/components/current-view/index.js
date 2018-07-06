import { connect } from 'react-redux';

import { getFilteredItems } from 'redux/selectors/get-filtered-items';
import getModuleReduxProp from 'utils/get-module-redux-prop';

import CurrentView from './current-view';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        items: getModuleReduxProp(state, 'items', 'items'),
        filteredItems: getFilteredItems(state, ownProps),
        currentView: getModuleReduxProp(state, 'currentView')
    };
}
export default connect(mapStateToProps)(CurrentView);
