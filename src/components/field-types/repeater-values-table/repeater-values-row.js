import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

import { Button } from 'reactstrap';
import { faTrash, faBars, faPencilAlt } from '@fortawesome/fontawesome-free-solid';

import Icon from 'components/icon';

class FieldMultiValue extends React.PureComponent {
    render() {
        const { item, deleteItem, editItem } = this.props;

        return (
            <li className="field-multi-values-row">
                <div className="item-name">{item.name}</div>
                <div className="btns">
                    <div className="drag-handle"><Icon icon={faBars} /></div>
                    <Button color="primary" className="btn-sm" onClick={() => editItem()}><Icon icon={faPencilAlt} /></Button>
                    <Button color="danger" className="btn-sm" onClick={() => deleteItem()}><Icon icon={faTrash} /></Button>
                </div>
            </li>
        );
    }
}

export default SortableElement(FieldMultiValue);