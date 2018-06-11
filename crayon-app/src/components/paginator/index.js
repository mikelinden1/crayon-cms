import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getFilteredItems } from 'redux/selectors/get-filtered-items';

import { setCurrentPage } from 'redux/actions/paginator';

import Paginator from './paginator';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        currentPage: state.paginator.currentPage,
        numOfItems: getFilteredItems(state, ownProps).length
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
