import { connect } from 'react-redux';

import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';

import GridViewCard from './grid-view-card';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        config: getCurrentModuleConfig(state, ownProps)
    };
}

export default connect(mapStateToProps)(GridViewCard);
