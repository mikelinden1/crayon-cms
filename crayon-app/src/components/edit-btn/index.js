import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { editItem } from 'redux/actions/items';

import EditBtn from './edit-btn';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            editItem
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBtn);
