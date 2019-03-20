import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react'

import config from 'config';

export default class Homepage extends React.PureComponent {
    render() {
        const modules = config.moduleOrder.map((moduleId) => {
            const moduleConfig = config.modules[moduleId];

            return (
                <Link key={`module-link-${moduleId}`} to={`/${moduleId}`} className="module-icon">
                    <Header as='h2' icon>
                        <Icon name={moduleConfig.icon} />
                        {moduleConfig.moduleName}
                    </Header>
                </Link>
            );
        });

        return (
            <div className="module-icon-grid">
                {modules}
                <Link key="module-link-media" to="/media" className="module-icon">
                    <Header as='h2' icon>
                        <Icon name='images' />
                        Media
                    </Header>
                </Link>
            </div>
        )
    }
}