import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router-dom';

import { fetchItems } from 'redux/actions/items';

import Main from './main';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        fetched: state.items.fetched,
        fetching: state.items.fetching,
        error: state.items.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            fetchItems
        }, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
