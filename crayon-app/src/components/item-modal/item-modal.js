import React from 'react';
import PropTypes from 'prop-types';
import itemPropShape from 'utils/item-prop-shape';

import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Spinner from 'components/spinner';
import Field from 'components/field';

import getPropByName from 'utils/get-prop-by-name';

import { DEFAULT_ERROR_MESSAGE } from 'utils/constants';

export default class ItemModal extends React.Component {
    static propTypes = {
        newItem: PropTypes.shape(itemPropShape(true)).isRequired,
        editMode: PropTypes.bool,
        saving: PropTypes.bool,
        changeMade: PropTypes.bool,
        config: PropTypes.object.isRequired,
        currentModule: PropTypes.string.isRequired,
        actions: PropTypes.shape({
            saveNewItem: PropTypes.func.isRequired,
            saveEditItem: PropTypes.func.isRequired,
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

        const { newItem, editMode, actions: { saveNewItem, saveEditItem } } = this.props;

        if (editMode) {
            saveEditItem(newItem);
        } else {
            saveNewItem(newItem);
        }
    }

    renderFields() {
        const { saving, currentModule, config: { itemProps, modalGrid } } = this.props;

        if (!modalGrid) {
            return itemProps.map((prop) => <Field key={`${prop.name}-field`} {...prop} />);
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

                return <div key={`col-${e}-row-${i}`} className={columnClass}><Field key={`${field.name}-field`} disabled={saving} {...field} /></div>;
            });

            return <div key={`row-${i}`} className="row">{rowHtml}</div>;
        });
    }

    render() {
        const { open, saving, error, editMode, hasValidationErrors, config: { itemName } } = this.props;

        const createBtn =   saving
                            ? <Button color="primary" disabled><Spinner /></Button>
                            : <Button color="primary" type="submit">Save</Button>;

        const fields = this.renderFields();

        const headerAction = editMode ? 'Edit' : 'New';

        const errorAlert =  error
                            ?   <Alert color="danger">{DEFAULT_ERROR_MESSAGE}</Alert>
                            :   hasValidationErrors
                                ? <Alert color="danger">Please correct the fields outlined in red</Alert>
                                : null;

        return (
            <Modal backdrop={false} isOpen={open} toggle={() => this.closeModal()}>
                <form onSubmit={(e) => this.saveItem(e)}>
                    <ModalHeader toggle={() => this.closeModal()}>
                        {headerAction} {itemName}
                    </ModalHeader>
                    <ModalBody>
                        {errorAlert}
                        {fields}
                    </ModalBody>
                    <ModalFooter>
                        {createBtn} {' '}
                        <Button color="secondary" onClick={() => this.closeModal()} disabled={saving}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        );
    }
}