import React from 'react';

import ModuleRoot from 'components/module-root';

class App extends React.Component {
    render() {
        return (
            <div className="skift-crud-app wrapper">
                <ModuleRoot moduleId="widgets" />
            </div>
        );
    }
}

export default App;
