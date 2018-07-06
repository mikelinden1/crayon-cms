import React from 'react';

import Header from 'components/header';
import Main from 'components/main';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="app-wrapper">
                    <Main />
                </div>
                <div className="powered-by text-center"><p><em>Powered by Crayon CMS by Mike Linden</em></p></div>
            </div>
        );
    }
}

export default App;
