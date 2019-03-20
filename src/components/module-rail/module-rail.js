import React from 'react';

import { Rail, Button, Icon } from 'semantic-ui-react';

import ArchiveSwitcher from 'components/archive-switcher';
import Search from 'components/search';
import Filter from 'components/filter';

export default class Switchers extends React.PureComponent {
    render() {
        const { actions: { clearFilters } } = this.props;
        
        return (
            <Rail className="module-rail" position="right">
                <ArchiveSwitcher />
                <Search />
                <Filter />
                <Button onClick={() => clearFilters()} fluid icon>
                    <Icon name="close" />
                    Clear Filters
                </Button>
            </Rail>
        );
    }
}