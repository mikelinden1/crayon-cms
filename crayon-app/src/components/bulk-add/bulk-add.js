import React from 'react';
import PropTypes from 'prop-types';
import TagsInput from 'react-tagsinput'

import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Spinner from 'components/spinner';

import config from 'config';

export default class BulkAdd extends React.Component {
    static propTypes = {
        columns: PropTypes.array.isRequired,
        open: PropTypes.bool.isRequired,
        adding: PropTypes.bool.isRequired,
        csvContents: PropTypes.string,
        error: PropTypes.string,
        actions: PropTypes.shape({
            setColumns: PropTypes.func.isRequired,
            addColumn: PropTypes.func.isRequired,
            closeDialog: PropTypes.func.isRequired,
            openDialog: PropTypes.func.isRequired,
            throwBulkError: PropTypes.func.isRequired,
            save: PropTypes.func.isRequired
        }).isRequired
    };

    closeModal() {
        const { actions: { closeDialog } } = this.props;

        closeDialog();
    }

    saveItems(e) {
        e.preventDefault();

        const { columns: columnHeaders, csvContents, actions: { throwBulkError, save } } = this.props;

        if (!columnHeaders || !columnHeaders.length) {
            throwBulkError('Specify at least one column');
            return;
        }

        if (!csvContents || !csvContents.length) {
            throwBulkError('Pick a CSV file');
            return;
        }

        const rows = csvContents.split('\n');
        const data = rows.map((row) => row.split(',').map((value) => value.trim()));

        if (!data.length) {
            throwBulkError('Empty CSV file');
            return;
        }

        const columnCountInCsv = data[0].length;
        if (columnCountInCsv !== columnHeaders.length) {
            throwBulkError(`Found ${columnCountInCsv} columns in the CSV file but you specified ${columnHeaders.length}`);
            return;
        }

        const mappedData = data.map((row) => {
            return row.reduce((collector, columnValue, i) => {
                collector[columnHeaders[i]] = columnValue;
                return collector;
            }, {})
        });

        save(mappedData);
    }

    changeFile(e) {
        const files = e.target.files;
        const { actions: { setCsvContent, throwBulkError } } = this.props;

        const file = files[0];
        if (file) {
            if (file.type !== 'text/csv') {
                throwBulkError('File must be in CSV format');
                return;
            }

            const reader = new FileReader();
            reader.readAsText(file, 'UTF-8');

            reader.onload = function (evt) {
                setCsvContent(evt.target.result);
            };

            reader.onerror = function (evt) {
                throwBulkError('Error reading CSV file');
            };
        }
    }


    render() {
        const { open, error, adding, columns, actions: { setColumns, addColumn, openDialog } } = this.props;
        const { capabilities: { bulkImport }, itemProps, itemName, itemNamePlural: itemP } = config;

        if (!bulkImport) {
            return null;
        }

        const itemNamePlural = itemP ? itemP : itemName + 's';

        const saveBtn   =   adding
                            ? <Button color="primary" disabled><Spinner /></Button>
                            : <Button color="primary" type="submit">Add</Button>;

        const errorBanner = error
                            ? <Alert color="danger">{error}</Alert>
                            : null;
        return (
            <div>
                <Button className="link-btn" onClick={() => openDialog()}>Bulk Import</Button>
                <Modal className="bulk-add" isOpen={open} toggle={() => this.closeModal()}>
                    <form onSubmit={(e) => this.saveItems(e)}>
                        <ModalHeader toggle={() => this.closeModal()}>
                            Bulk Import {itemNamePlural}
                        </ModalHeader>
                        <ModalBody>
                            {errorBanner}
                            <h3>CSV Columns</h3>
                            <TagsInput value={columns} disabled={adding} onChange={(e) => setColumns(e)} />

                            <div style={{margin: '10px 0'}}>
                                {itemProps.map((prop) => {
                                    return (
                                        <Button
                                            key={`column-btn-${prop.name}`}
                                            onClick={() => addColumn(prop.name)}
                                            className="btn-sm"
                                            disabled={adding || columns.indexOf(prop.name) !== -1}
                                            color="secondary">{prop.name}</Button>
                                    );
                                })}
                            </div>

                            <p><small><em>Click on column names to add them</em></small></p>

                            <h3>CSV File</h3>
                            <input type="file" disabled={adding} id="csvFile" onChange={(e) => this.changeFile(e)} />
                        </ModalBody>
                        <ModalFooter>
                            {saveBtn} {' '}
                            <Button color="secondary" onClick={() => this.closeModal()} disabled={adding}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}