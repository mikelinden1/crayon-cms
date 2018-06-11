import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setSearch } from 'redux/actions/filters';

import Search from './search';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        search: state.search.terms
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setSearch
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
