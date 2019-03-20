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
                <p style={{marginTop: '30px', textAlign: 'center', fontSize: '10px'}}><em>Powered by Crayon CMS by Mike Linden</em></p>
            </div>
        );
    }
}

export default App;
