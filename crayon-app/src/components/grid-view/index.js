import { connect } from 'react-redux';

import { getFilteredAndPaginatedItems } from 'redux/selectors/get-filtered-and-paginated-items';

import GridView from './grid-view';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        items: getFilteredAndPaginatedItems(state, ownProps)
    };
}

export default connect(mapStateToProps)(GridView);
