import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon } from 'semantic-ui-react';

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

        if (displayType !== 'switch') {
            return null;
        }

        const oppositeView = currentView === 'table' ? 'grid' : 'table';

        return (
            <Button.Group onClick={() => switchView(oppositeView)}>
                <Button color={currentView === 'table' ? 'blue' : null}>
                    <Icon name="bars" />
                </Button>
                <Button color={currentView === 'grid' ? 'blue' : null}>
                    <Icon name="th" />
                </Button>
            </Button.Group>
        );
    }
}