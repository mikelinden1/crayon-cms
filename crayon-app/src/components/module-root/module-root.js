import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import checkConfigFile from 'utils/check-config';

import config from 'config';

import Module from 'components/module';

export default class Main extends React.PureComponent {
    static propTypes = {
        moduleId: PropTypes.string.isRequired,
        actions: PropTypes.shape({
            setModuleId: PropTypes.func.isRequired
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
        const configInValid = checkConfigFile();

        if (configInValid) {
            return <Alert color="danger">There are errors in the config file. See console.</Alert>;
        }

        const { pluginName, pluginVersion } = config;

        const pluginVersionText =   pluginVersion
                                    ? <p><strong>v{pluginVersion}</strong></p>
                                    : null;

        return (
            <div id="module-root">
                <h1>{pluginName}</h1>
                {pluginVersionText}

                <Module />
            </div>
        );
    }
}