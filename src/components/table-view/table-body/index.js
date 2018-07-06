import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { sortEnd } from 'redux/actions/items';

import TableBody from './table-body';
import { getFilteredAndPaginatedItems } from 'redux/selectors/get-filtered-and-paginated-items';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        items: getFilteredAndPaginatedItems(state, ownProps)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            sortEnd
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableBody);
