import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import checkConfigFile from 'utils/check-config';

import Spinner from 'components/spinner';
import Module from 'components/module';

export default class ModuleRoot extends React.PureComponent {
    static propTypes = {
        moduleId: PropTypes.string.isRequired,
        actions: PropTypes.shape({
            setModule: PropTypes.func.isRequired
        }).isRequired
    };

    componentWillMount() {
        const { moduleId } = this.props;

        if (moduleId) {
            this.setModule(moduleId);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { moduleId, currentModule } = nextProps;

        if (moduleId !== currentModule) {
            this.setModule(moduleId);
        }
    }

    setModule(id) {
        const { actions: { setModule } } = this.props;

        setModule(id);
    }

    render() {
        const { config, currentModule } = this.props;

        if (!currentModule) {
            return <p><Spinner /> Loading module...</p>;
        }

        if (!config) {
            return <Alert color="danger">Missing config attributes.</Alert>;
        }

        const configIsValid = checkConfigFile(config.id);

        if (configIsValid) {
            return <Alert color="danger">There are errors in the config file. See console.</Alert>;
        }

        const { moduleName } = config;

        return (
            <div id="module-root">
                <h1 style={{marginBottom: '20px' }}>{moduleName}</h1>
                <Module />
            </div>
        );
    }
}