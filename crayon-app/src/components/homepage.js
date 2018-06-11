import React from 'react';
import { Link } from 'react-router-dom';

import Icon from 'components/icon';
import config from 'config';

export default class Homepage extends React.PureComponent {
    render() {
        return config.moduleOrder.map((moduleId) => {
            const moduleConfig = config.modules[moduleId];

            return (
                <Link key={`module-link-${moduleId}`} to={`/${moduleId}`} className="module-icon">
                    <div className="icon"><Icon icon={moduleConfig.icon} /></div>
                    <div className="module-name">{moduleConfig.moduleName}</div>
                </Link>
            );
        });
    }
}