import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';
import { faBars, faTh } from '@fortawesome/fontawesome-free-solid';

import Icon from 'components/icon';

export default class ViewSwitcher extends React.PureComponent {
    static propTypes = {
        currentView: PropTypes.string.isRequired,
        config: PropTypes.object.isRequired,
        actions: PropTypes.shape({
            switchView: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { currentView, config, actions: { switchView } } = this.props;
        let { views: { displayType } } = config;

        if (!displayType) {
            displayType = 'table';
        }

        const oppositeView = currentView === 'table' ? 'grid' : 'table';

        return (
            <div className="btn-group" style={{border: '1px solid #1a1a1a'}} onClick={() => switchView(oppositeView)}>
                <Button color={currentView === 'table' ? 'primary' : 'secondary'}>
                    <Icon icon={faBars} />
                </Button>
                <Button color={currentView === 'grid' ? 'primary' : 'secondary'}>
                    <Icon icon={faTh} />
                </Button>
            </div>
        );
    }
}