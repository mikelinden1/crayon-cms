import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openItemModal } from 'redux/actions/item-modal';

import AddNew from './add-new';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            openItemModal
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNew);
