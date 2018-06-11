import React from 'react';
import { Switch, Route } from 'react-router-dom'

import config from 'config';

import Homepage from 'components/homepage';
import ModuleRoot from 'components/module-root';

class App extends React.Component {
    render() {
        return (
            <div className="skift-crud-app wrapper">
                <Switch>
                    <Route exact path='/' render={(props) => <Homepage />} />
                    {
                        config.moduleOrder.map((moduleId) => {
                            return <Route key={`module-route-${moduleId}`} exact path={`/${moduleId}`} render={(props) => <ModuleRoot moduleId={moduleId} {...props} />} />;
                        })
                    }
                </Switch>
            </div>
        );
    }
}

export default App;
