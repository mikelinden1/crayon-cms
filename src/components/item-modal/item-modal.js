import React from 'react';
import PropTypes from 'prop-types';

import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Spinner from 'components/spinner';
import FieldGroup from 'components/field-group';

import getPropByName from 'utils/get-prop-by-name';

import { DEFAULT_ERROR_MESSAGE } from 'utils/constants';

export default class ItemModal extends React.Component {
    static propTypes = {
        open: PropTypes.bool,
        newItem: PropTypes.object.isRequired,
        editMode: PropTypes.bool,
        saving: PropTypes.bool,
        bulkEdit: PropTypes.bool,
        changeMade: PropTypes.bool,
        config: PropTypes.shape({
            itemProps: PropTypes.array.isRequired,
            modalGrid: PropTypes.array,
            itemName: PropTypes.string.isRequired
        }).isRequired,
        currentModule: PropTypes.string.isRequired,
        actions: PropTypes.shape({
            saveNewItem: PropTypes.func.isRequired,
            saveEditItem: PropTypes.func.isRequired,
            saveBulkEdit: PropTypes.func.isRequired,
            closeItemModal: PropTypes.func.isRequired
        }).isRequired
    };

    closeModal() {
        const { changeMade, actions: { closeItemModal } } = this.props;

        if (!changeMade || window.confirm('You have unsaved changes, are you sure you want to close this window?')) {
            closeItemModal();
        }
    }

    saveItem(e) {
        e.preventDefault();

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

        return modalGrid.map((row, i) => {
            const columnCount = row.length;
            const columnClass = `col-md-${12/columnCount}`;

            const rowHtml = row.map((col, e) => {
                const field = getPropByName(currentModule, col);

                if (!field) {
                    console.error('Missing prop in modal', col);
                    return null;
                }

                return <div key={`col-${e}-row-${i}`} className={columnClass}><FieldGroup key={`${field.name}-field`} disabled={saving} {...field} /></div>;
            });

            return <div key={`row-${i}`} className="row">{rowHtml}</div>;
        });
    }

    render() {
        const { open, saving, error, editMode, bulkEdit, hasValidationErrors, config: { itemName, itemNamePlural } } = this.props;

        const createBtn =   saving
                            ? <Button className="save-btn" color="primary" disabled><Spinner /></Button>
                            : <Button className="save-btn" color="primary" type="submit">Save</Button>;

        const fields = this.renderFields();

        const headerAction = editMode ? 'Edit' : 'New';
        const entireHeader = bulkEdit ? `Bulk Edit ${itemNamePlural}` : `${headerAction} ${itemName}`;

        const errorAlert =  error
                            ?   <Alert color="danger">{DEFAULT_ERROR_MESSAGE}</Alert>
                            :   hasValidationErrors
                                ? <Alert color="danger">Please correct the fields outlined in red</Alert>
                                : null;

        return (
            <Modal isOpen={open} toggle={() => this.closeModal()}>
                <form onSubmit={(e) => this.saveItem(e)}>
                    <ModalHeader toggle={() => this.closeModal()}>
                        {entireHeader}
                    </ModalHeader>
                    <ModalBody>
                        { bulkEdit ? <p><em>Fields with values will save for ALL items - empty fields will be ignored.</em></p> : null }
                        {errorAlert}
                        {fields}
                    </ModalBody>
                    <ModalFooter>
                        {createBtn} {' '}
                        <Button className="cancel-btn" color="secondary" onClick={() => this.closeModal()} disabled={saving}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        );
    }
}