import React from 'react';

import { Button, Icon } from 'semantic-ui-react';

import ArchiveSwitcher from 'components/archive-switcher';
import Search from 'components/search';
import Filter from 'components/filter';

export default class Switchers extends React.PureComponent {
    render() {
        const { actions: { clearFilters } } = this.props;

        return (
            <section className="module-rail">
                <ArchiveSwitcher />
                <Search />
                <Filter />
                <Button onClick={() => clearFilters()} fluid icon>
                    <Icon name="close" />
                    Clear Filters
                </Button>
            </section>
        );
    }
}