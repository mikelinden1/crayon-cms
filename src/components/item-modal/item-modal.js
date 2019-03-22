import React from 'react';
import PropTypes from 'prop-types';

import { Form, Message, Button, Modal, Header, Grid } from 'semantic-ui-react';

import FieldGroup from 'components/field-group';

import getPropByName from 'utils/get-prop-by-name';
import hashObject from 'utils/hash-object';

import { DEFAULT_ERROR_MESSAGE } from 'utils/constants';

export default class ItemModal extends React.Component {
    static propTypes = {
        newItem: PropTypes.object.isRequired,
        editMode: PropTypes.bool,
        saving: PropTypes.bool,
        bulkEdit: PropTypes.bool,
        config: PropTypes.object.isRequired,
        currentModule: PropTypes.string.isRequired,
        startingFingerprint: PropTypes.number,
        actions: PropTypes.shape({
            saveNewItem: PropTypes.func.isRequired,
            saveEditItem: PropTypes.func.isRequired,
            saveBulkEdit: PropTypes.func.isRequired,
            closeItemModal: PropTypes.func.isRequired
        }).isRequired
    };

    closeModal() {
        const { startingFingerprint, newItem, actions: { closeItemModal } } = this.props;

        const newFingerprint = hashObject(newItem);

        if (newFingerprint === startingFingerprint || window.confirm('You have unsaved changes, are you sure you want to close this window?')) {
            closeItemModal();
        }
    }

    saveItem() {
        const { newItem, editMode, bulkEdit, actions: { saveNewItem, saveBulkEdit, saveEditItem } } = this.props;

        if (editMode) {
            saveEditItem(newItem);
        } else {
            if (bulkEdit) {
                saveBulkEdit(newItem);
            } else {
                saveNewItem(newItem);
            }
        }
    }

    renderFields() {
        const { saving, currentModule, config: { itemProps, modalGrid } } = this.props;

        if (!modalGrid) {
            return itemProps.map((prop) => <FieldGroup key={`${prop.name}-field`} {...prop} />);
        }

        const gridRows = modalGrid.map((row, i) => {
            const columnCount = row.length;
            const columnWidth = Math.floor(16/columnCount);

            const rowHtml = row.map((col, e) => {
                const field = getPropByName(currentModule, col);

                if (!field) {
                    console.error('Missing prop in modal', col);
                    return null;
                }

                return (
                    <Grid.Column key={`col-${e}-row-${i}`} width={columnWidth}>
                        <FieldGroup key={`${field.name}-field`} disabled={saving} {...field} />
                    </Grid.Column>
                );
            });

            return <Grid.Row key={`row-${i}`}>{rowHtml}</Grid.Row>;
        });

        return <Grid>{gridRows}</Grid>;
    }

    render() {
        const { open, saving, error, editMode, bulkEdit, hasValidationErrors, config: { itemName, itemNamePlural } } = this.props;

        const fields = this.renderFields();

        const headerAction = editMode ? 'Edit' : 'New';
        const entireHeader = bulkEdit ? `Bulk Edit ${itemNamePlural}` : `${headerAction} ${itemName}`;

        const errorAlert =  error
                            ?   <Message error>{DEFAULT_ERROR_MESSAGE}</Message>
                            :   hasValidationErrors
                                ? <Message error>Please correct the fields outlined in red</Message>
                                : null;

        return (
            <form onSubmit={(e) => this.saveItem(e)}>
                <Modal 
                    open={open} 
                    onClose={() => this.closeModal()}>
                    <Header content={entireHeader} />
                    <Modal.Content>
                        { bulkEdit ? <p><em>Fields with values will save for ALL items - empty fields will be ignored.</em></p> : null }
                        {errorAlert}
                        <Form loading={saving}>
                            {fields}
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="blue" loading={saving} onClick={() => this.saveItem()}>Save</Button>
                        <Button onClick={() => this.closeModal()} disabled={saving}>Cancel</Button>
                    </Modal.Actions>
                </Modal>
            </form>
        );
    }
}