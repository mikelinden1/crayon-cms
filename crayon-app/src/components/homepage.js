import React from 'react';
import { Link } from 'react-router-dom';

import config from 'config';

export default class Homepage extends React.PureComponent {
    render() {
        return config.moduleOrder.map((moduleId) => {
            return <Link to={`/${moduleId}`}>{config.modules[moduleId].moduleName}</Link>;
        });
    }
}