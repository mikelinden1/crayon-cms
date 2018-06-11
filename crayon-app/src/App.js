import React, { Component } from 'react';
import { Alert } from 'reactstrap';

import checkConfigFile from 'utils/check-config';

import config from 'config';

import Main from 'components/main';

class App extends Component {
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
            <div className="skift-crud-app wrapper">
                <h1>{pluginName}</h1>
                {pluginVersionText}

                <Main />
            </div>
        );
    }
}

export default App;
