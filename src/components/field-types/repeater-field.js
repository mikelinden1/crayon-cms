import React from 'react';
import FieldGroup from 'components/field-group';
import RepeaterValuesTable from './repeater-values-table';

import { Button } from 'reactstrap';

export default class RepeaterField extends React.PureComponent {

    constructor(props) {
        super(props);

        let value = this.props.value || [];
        if (typeof value === 'string') {
            value = JSON.parse(value);
        }

        this.state = {
            newItem: {},
            value
        }

        
    }

    addItem() {
        const value = [...this.state.value];
        value.push(this.state.newItem);
        console.log(this.state.newItem);
        
        this.setState({ newItem: {}, value});
        this.props.onChange(value);
    }

    updateValueFromTable(value) {
        this.setState({ value });
        this.props.onChange(value);
    }

    editItem(i, item) {
        item.idx = i;
        this.setState({ newItem: item, editMode: true });
    }

    saveEditItem() {
        const newValue = [...this.state.value];
        const editedItem = this.state.newItem;
        const idx = editedItem.idx;
        delete editedItem.idx;

        newValue[idx] = editedItem;
        
        this.setState({ newItem: {}, value: newValue, editMode: false });
        this.props.onChange(newValue);
    }


    render() {
        const { itemProps, label, singleLabel } = this.props;
                 
        return (
            <React.Fragment>
                <RepeaterValuesTable 
                    items={this.state.value} 
                    label={label} 
                    onChange={val => this.updateValueFromTable(val)} 
                    editItem={(i, item) => this.editItem(i, item)}
                />
                <div className="repeater__new_item">
                    {
                        itemProps.map(prop => {
                            return (
                                <FieldGroup 
                                    valueOverride={this.state.newItem[prop.dataName]} 
                                    onChange={val => this.setState({ newItem: { ...this.state.newItem, [prop.dataName]: val }})} 
                                    key={`${prop.name}-field`} 
                                    {...prop} />
                            );
                        })
                    }
                    <Button color="primary" size="xsmall" onClick={() => this.state.editMode ? this.saveEditItem() : this.addItem()}>{this.state.editMode ?  'Edit' : 'Add'} {singleLabel}</Button>
                    {this.state.editMode && <Button color="secondary" size="xsmall" onClick={() => this.setState({ newItem: {}, editMode: false })}>Cancel</Button>}
                </div>
            </React.Fragment>
        );
    }
}