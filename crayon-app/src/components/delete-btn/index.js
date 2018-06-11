import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deleteItem } from 'redux/actions/items';
import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';

import DeleteBtn from './delete-btn';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        config: getCurrentModuleConfig(state, ownProps)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            deleteItem
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteBtn);
