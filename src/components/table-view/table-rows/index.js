import { connect } from 'react-redux';

import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';

import TableRows from './table-rows';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        config: getCurrentModuleConfig(state, ownProps)
    };
}

export default connect(mapStateToProps)(TableRows);
