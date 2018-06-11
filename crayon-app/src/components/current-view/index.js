import { connect } from 'react-redux';

import { getFilteredItems } from 'redux/selectors/get-filtered-items';

import CurrentView from './current-view';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        items: state.items.items,
        filteredItems: getFilteredItems(state, ownProps),
        currentView: state.currentView
    };
}
export default connect(mapStateToProps)(CurrentView);
