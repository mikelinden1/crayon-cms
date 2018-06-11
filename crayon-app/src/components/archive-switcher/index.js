import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setArchive } from 'redux/actions/filters';
import { getCurrentModuleConfig } from 'redux/selectors/get-current-module-config';

import ArchiveSwitcher from './archive-switcher';

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        archiveMode: state.archive,
        config: getCurrentModuleConfig(state, ownProps)
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
