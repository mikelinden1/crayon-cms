import config from 'config';
import getPropByName from 'utils/get-prop-by-name';

export default function checkConfigFile() {
    const requiredProps = [
         'pluginName',
         'pluginId',
         'itemName',
         'capabilities',
         'filtering',
         'views',
         'itemProps'
    ];

    const expectedPropTypes = {
        pluginName: 'string',
        pluginId: 'string',
        pluginVersion: 'string',
        itemName: 'string',
        itemNamePlural: 'string',
        capabilities: {
            reorderable: 'boolean',
            editable: 'boolean',
            deleteable: 'boolean',
            deleteIdProp: 'string'
        },
        filtering: {
            searchFields: 'array',
            filterFields: 'array',
            sortable: 'boolean'
        },
        defaultSort: { field: 'string', desc: 'boolean' },
        itemsPerPage: 'number',
        views: {
            displayType: 'string',
            defaultView: 'string',
            table: 'object',
            grid: 'object'
        },
        modalGrid: 'array',
        itemProps: 'array'
    };

    let errors = false;

    // check required props
    for (let i = 0, e = requiredProps.length; i < e; i++) {
        const p = requiredProps[i];
        if (!config[p]) {
            console.error('Config error: Missing required config property', p);
            errors = true;
        }
    }

    // check root prop types
    for (const p in expectedPropTypes) {
        if (expectedPropTypes.hasOwnProperty(p)) {
            const e = expectedPropTypes[p];

            if (typeof e === 'object') {
                for (const sp in e) {
                    if (e.hasOwnProperty(sp)) {
                        const se = e[sp];
                        if (!checkTypeMatches(p, config[p][sp], se)) {
                            errors = true;
                        }
                    }
                }

                continue;
            }

            if (!checkTypeMatches(p, config[p], e)) {
                errors = true;
            }
        }
    }

    if (config.capabilities && config.capabilities.deleteIdProp) {
        if (!propExists(config.capabilities.deleteIdProp)) {
            console.error(`Config error: property ${config.capabilities.deleteIdProp} specified by deleteIdProp does not exist`);
            errors = true;
        }
    }

    if (config.filtering) {
        if (config.filtering.filterFields) {
            for (let i = 0, e = config.filtering.filterFields.length; i < e; i++) {
                if (!propExists(config.filtering.filterFields[i])) {
                    console.error(`Config error: property ${config.filtering.filterFields[i]} specified by filterFields does not exist`);
                    errors = true;
                }
            }
        }

        if (config.filtering.searchFields) {
            for (let i = 0, e = config.filtering.searchFields.length; i < e; i++) {
                if (!propExists(config.filtering.searchFields[i])) {
                    console.error(`Config error: property ${config.filtering.searchFields[i]} specified by searchFields does not exist`);
                    errors = true;
                }
            }
        }
    }

    if (config.defaultSort && config.defaultSort.field) {
        if (!propExists(config.defaultSort.field)) {
            console.error(`Config error: property ${config.defaultSort.field} specified by defaultSort.field does not exist`);
            errors = true;
        }
    }

    if (config.archive && config.archive.field) {
        if (!propExists(config.archive.field)) {
            console.error(`Config error: property ${config.archive.field} specified by archive.field does not exist`);
            errors = true;
        } else {
            // prop exists, make sure it's a date field
            const archiveField = getPropByName(config.archive.field);
            if (archiveField.type !== 'datepicker') {
                console.error(`Config error: property ${config.archive.field} specified by archive.field must be a datepicker`);
                errors = true;
            }
        }
    }

    if (config.views && config.views.table && config.views.table.columns) {
        const cols = config.views.table.columns;

        for (let i = 0, e = cols.length; i < e; i++) {
            if (!propExists(cols[i].name)) {
                console.error(`Config error: property ${cols[i].name} specified in the tableview columns does not exist`);
                errors = true;
            }
        }
    }

    if (config.views && config.views.grid && config.views.grid.layout) {
        const cols = config.views.grid.layout;

        for (let i = 0, e = cols.length; i < e; i++) {
            if (!propExists(cols[i].name)) {
                console.error(`Config error: property ${cols[i].name} specified in the gridview layout does not exist`);
                errors = true;
            }
        }
    }

    if (config.modalGrid) {
        for (let i = 0, e = config.modalGrid.length; i < e; i++) {
            for (let x = 0, y = config.modalGrid[i].length; x < y; x++) {
                if (!propExists(config.modalGrid[i][x])) {
                    console.error(`Config error: property ${config.modalGrid[i][x]} specified in the modalGrid does not exist`);
                    errors = true;
                }
            }
        }
    }

    return errors;
};

function checkTypeMatches(p, v, e) {
    if (e === 'array') {
        if (!Object.prototype.toString.call(v) === '[object Array]' ) {
            console.error(`Config error: ${p} is expected to be an array but encountered a(n) ${typeof v}`);
            return false;
        }

        return true;
    }

    if (typeof v !== e) {
        console.error(`Config error: ${p} is expected to be ${e} but encountered a(n) ${typeof v}`);
        return false;
    }

    return true;
}

function propExists(p) {
    if (p === 'sort' || p === 'id') {
        return true;
    }

    if (!getPropByName(p)) {
        return false;
    }

    return true;
}