import React, { useEffect, useState } from 'react';
import { SortableElement } from 'react-sortable-hoc';

import { Button } from 'reactstrap';
import { faTrash, faBars, faPencilAlt } from '@fortawesome/fontawesome-free-solid';

import Icon from 'components/icon';

const FieldMultiValue = ({ item, tableLabelProp, itemProps, datasources, fetchDatasource, deleteItem, editItem }) => {
    const [label, setLabel] = useState(item.name);

    useEffect(() => {
        if (tableLabelProp) {
            const targetItem = itemProps.find(prop => prop.name === tableLabelProp);

            if (targetItem) {
                if (targetItem.source) {
                    const datasource = datasources[targetItem.name];

                    if (!datasource) {
                        fetchDatasource(targetItem.name, targetItem.source);
                    } else if (datasource.data) {
                        const matchingItem =  datasource.data.find(
                            ds => ds.value === item[targetItem.dataName]
                        );

                        setLabel(matchingItem ? matchingItem.label : 'Not found');
                    } else {
                        setLabel("Loading...");
                    }
                } else {
                    setLabel(item[targetItem.dataName]);
                }
            }
        }
    }, [tableLabelProp, itemProps, datasources, fetchDatasource, item]);

    return (
        <li className="field-multi-values-row">
            <div className="item-name">{label}</div>
            <div className="btns">
                <div className="drag-handle"><Icon icon={faBars} /></div>
                <Button color="primary" className="btn-sm" onClick={() => editItem()}><Icon icon={faPencilAlt} /></Button>
                <Button color="danger" className="btn-sm" onClick={() => deleteItem()}><Icon icon={faTrash} /></Button>
            </div>
        </li>
    );
};

export default SortableElement(FieldMultiValue);
