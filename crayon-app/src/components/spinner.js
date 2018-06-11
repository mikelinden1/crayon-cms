import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/fontawesome-free-solid'

export default class Spinner extends React.PureComponent {
    render() {
        return <FontAwesomeIcon icon={faCog} spin={true} />;
    }
}