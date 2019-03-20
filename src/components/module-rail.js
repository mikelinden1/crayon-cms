import React from 'react';

import { Rail } from 'semantic-ui-react';

import ViewSwitcher from 'components/view-switcher';
import ArchiveSwitcher from 'components/archive-switcher';
import Search from 'components/search';
import Filter from 'components/filter';

export default class Switchers extends React.PureComponent {
    render() {
        return (
            <Rail position="right" close="very">
                <ViewSwitcher />
                <ArchiveSwitcher />
                <Search />
                <Filter />
            </Rail>
        );
    }
}