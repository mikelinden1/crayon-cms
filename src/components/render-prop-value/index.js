import { connect } from 'react-redux';

import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';

import RenderPropValue from './render-prop-value';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        config: getCurrentModuleConfig(state, ownProps)
    };
}

export default connect(mapStateToProps)(RenderPropValue);
