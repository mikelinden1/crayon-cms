import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSort } from 'redux/actions/filters';

import SortDropdowns from './sort-dropdowns';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        currentSort: state.sort
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setSort
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SortDropdowns);
