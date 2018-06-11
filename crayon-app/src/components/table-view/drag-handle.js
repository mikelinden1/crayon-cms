import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import { faBars } from '@fortawesome/fontawesome-free-solid';

import Icon from 'components/icon';

class DragHandle extends React.PureComponent {
    render() {
        return <div className="drag-handle"><Icon icon={faBars} /></div>;
    }
};

export default SortableHandle(DragHandle);