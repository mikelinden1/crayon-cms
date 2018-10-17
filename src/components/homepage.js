import React from 'react';
import { Link } from 'react-router-dom';

import Icon from 'components/icon';
import config from 'config';
import { faImages } from '@fortawesome/fontawesome-free-solid';

export default class Homepage extends React.PureComponent {
    render() {
        const modules = config.moduleOrder.map((moduleId) => {
            const moduleConfig = config.modules[moduleId];

            return (
                <Link key={`module-link-${moduleId}`} to={`/${moduleId}`} className="module-icon">
                    <div className="icon"><Icon icon={moduleConfig.icon} /></div>
                    <div className="module-name">{moduleConfig.moduleName}</div>
                </Link>
            );
        });

        return (
            <div className="module-icon-grid">
                {modules}
                <Link key="module-link-media" to="/media" className="module-icon">
                    <div className="icon"><Icon icon={faImages} /></div>
                    <div className="module-name">Media</div>
                </Link>
            </div>
        )
    }
}