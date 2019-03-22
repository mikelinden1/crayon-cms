import React from 'react';
import PropTypes from 'prop-types';

import checkConfigFile from 'utils/check-config';

import { Message, Loader } from 'semantic-ui-react';
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
            return <div className="padded-container"><Loader active inline="centered" content='Loading Module' /></div>;
        }

        if (!config) {
            return <div className="padded-container"><Message error>Missing config attributes.</Message></div>;
        }

        const configIsValid = checkConfigFile(config.id);

        if (configIsValid) {
            return <div className="padded-container"><Message error>There are errors in the config file. See console.</Message></div>;
        }

        return (
            <div id="module-root">
                <Module />
            </div>
        );
    }
}