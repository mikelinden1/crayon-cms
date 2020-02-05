import { connect } from 'react-redux';

import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';

import AdditionalActions from './additional-actions';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        config: getCurrentModuleConfig(state, ownProps)
    };
}

export default connect(mapStateToProps)(AdditionalActions);
