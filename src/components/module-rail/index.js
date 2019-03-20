import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearFilters } from 'redux/actions/filters';

import ModuleRail from './module-rail';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            clearFilters
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleRail);
