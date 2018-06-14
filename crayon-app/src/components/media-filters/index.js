import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setMediaSearch, setMediaModuleFilter, setMediaSort } from 'redux/actions/media-picker';

import MediaFilters from './media-filters';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        search: state.mediaPicker.search,
        moduleFilter: state.mediaPicker.moduleFilter,
        sort: state.mediaPicker.sort
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setSearch: setMediaSearch,
            setSort: setMediaSort,
            setModuleFilter: setMediaModuleFilter
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaFilters);
