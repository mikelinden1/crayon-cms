import { faCog } from '@fortawesome/fontawesome-free-solid';

const config = {
    id: 'bits',
    moduleName: 'Manage Bits', // Displayed at the top of the module
    icon: faCog,
    itemName: 'Bit', // What are items called? (displayed in modal, delete confirmation, etc)
    itemNamePlural: 'Bits', // How do I say that in the plural form?
    capabilities: {
        reorderable: true, // Can the user reorder items? If yes, sorting will be disabled.
        editable: true, // Can the user edit items?
        deleteable: true, // Can the user delete items?
        deleteIdProp: 'name', // Property used in the delete confirm dialog (default to 'name' if not set)
        bulkImport: true
    },
    filtering: {
        searchFields: ['name'], // Which fields should be searchable?
        filterFields: null, // Which fields should have filtering dropdowns displayed?
        sortable: true // Can the user sort the items in the display? Not available if reorderable is on.
    },
    defaultSort: { field: 'sort', desc: false }, // What should the default sort be? Should be 'sort' if sortable is true above
    itemsPerPage: 6, // How many items should I display on a page? Set to null to disable pagination.
    views: {
        displayType: 'table', // How should I display the items? Options: table, grid, or switch to show a switcher
        defaultView: 'table', // Which view should I default to?
        table: {
            /**
            What columns would you like in the table view?

            column properties:
            -----------------
            heading: Text displayed at the top of the table
            name: prop identifier (defined in itemProps)
            displayType (optional, default: 'text'): define a special display type [image | boolean (shows a check if true) | boolean-labelright | truncate | text]
            alignment (optional, default: 'left'): define the text alignment for the header and value [left | center | justified | right]
            altProp (optional, default: 'Table photo'): used by the image displayType in the alt tag
            length (optional, default: 100): used by the truncate displayType as the cut-off point
            **/
            columns: [
                { heading: 'Name', name: 'name' },
                { heading: 'Type', name: 'type' }
            ],
            showId: true // Should I show the ID column? (recommended if default sorting is by ID)
        },
        grid: null
    },
    // This is how the modal grid will be displayed. The root array is the rows and the child array sets the columns. Use property name's.
    modalGrid: null,
    /***************************************************************
    This is where we define all of the properties for an item.
    -----------------------------------------------------------
    name (string, required, snake case, must match backend config): Identifier for a particular field
    label (string, required): Displayed text above field
    type (string, required): text | dropdown | checkbox | radio | photo | tags | rte (rich text editor) | textarea | datepicker
    required (boolean): is this field required?
    minLength (number)
    maxLength (number)
    regexFormat (regex)
    regexErrorText (string, required if regexFormat is set)
    helpText (string): text displayed below the field to help the user

    Type specific params:
    --------------------
    text:       no additional params
    dropdown:   options (array of objects, required)
                    label (string, required)
                    value (string, required)
                source object defining properties for an external datasource:
                    url: url of json file
                    labelKey: property to use for the label
                    valueKey: property to use for the value
                multiple (boolean)
    radio:      options (array of objects, required)
                    label (string, required)
                    value (string, required)
    datepicker: showTime (boolean)
                timeInterval (number) how many minutes between time options (defaults to 30)
    checkbox:   no additional params
    textarea:   rows (number)
    tags:       no additional params
    rte:        no additional params
    ****************************************************************/
    itemProps: [
        {
            name: 'name',
            label: 'Text',
            type: 'text',
            required: true,
            minLength: 3,
            maxLength: 30
        },
        {
            name: 'type',
            label: 'Dropdown',
            type: 'dropdown',
            many: true,
            options: [
                { value: 'foo', label: 'Foo' },
                { value: 'baz', label: 'Baz' },
                { value: 'bar', label: 'Bar' }
            ]
        },
        {
            name: 'photos',
            label: 'Photos',
            type: 'photo',
            many: true
        }
    ]
};

export default config;