import React from 'react';
import { Switch, Route } from 'react-router-dom'

import config from 'config';

import Header from 'components/header';
import Homepage from 'components/homepage';
import Login from 'components/login';
import ModuleRoot from 'components/module-root';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="app-wrapper">
                    <Switch>
                        <Route exact path='/' render={(props) => <Homepage />} />
                        <Route exact path='/login' render={(props) => <Login />} />
                        {config.moduleOrder.map((moduleId) => {
                            return <Route key={`module-route-${moduleId}`} exact path={`/${moduleId}`} render={(props) => <ModuleRoot moduleId={moduleId} {...props} />} />;
                        })}
                    </Switch>

                    <div className="powered-by text-center"><p><em>Powered by Crayon CMS by Mike Linden</em></p></div>
                </div>
            </div>
        );
    }
}

export default App;
