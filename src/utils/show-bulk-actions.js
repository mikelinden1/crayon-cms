export function showBulkActions(capabilities) {
    return capabilities.bulkEdit || capabilities.bulkDelete;
};