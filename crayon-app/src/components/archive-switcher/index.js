import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setArchive } from 'redux/actions/filters';

import ArchiveSwitcher from './archive-switcher';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        archiveMode: state.archive
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setArchive
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveSwitcher);
