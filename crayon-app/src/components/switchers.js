import React from 'react';

import ViewSwitcher from 'components/view-switcher';
import ArchiveSwitcher from 'components/archive-switcher';
import SortDropdowns from 'components/sort-dropdowns';

export default class Switchers extends React.PureComponent {
    render() {
        return (
            <div className="switchers">
                <ViewSwitcher />
                <ArchiveSwitcher />
                <SortDropdowns />
            </div>
        );
    }
}