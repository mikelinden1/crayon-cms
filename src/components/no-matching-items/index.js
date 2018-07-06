import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearFilters } from 'redux/actions/filters';
import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';

import NoMatchingItems from './no-matching-items';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        config: getCurrentModuleConfig(state, ownProps)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            clearFilters
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NoMatchingItems);
