import { faPuzzlePiece } from '@fortawesome/fontawesome-free-solid';

const config = {
    id: 'widgets',
    moduleName: 'Manage Widgets', // Displayed at the top of the module
    icon: faPuzzlePiece,
    itemName: 'Widget', // What are items called? (displayed in modal, delete confirmation, etc)
    itemNamePlural: 'Widgets', // How do I say that in the plural form?
    capabilities: {
        reorderable: false, // Can the user reorder items? If yes, sorting will be disabled.
        editable: true, // Can the user edit items?
        deleteable: true, // Can the user delete items?
        deleteIdProp: 'name', // Property used in the delete confirm dialog (default to 'name' if not set)
        bulkImport: true
    },
    filtering: {
        searchFields: ['name', 'slug'], // Which fields should be searchable?
        filterFields: ['type', 'radio', 'canada'], // Which fields should have filtering dropdowns displayed?
        sortable: true // Can the user sort the items in the display? Not available if reorderable is on.
    },
    archive: { // Do you want to show a switcher based on a date field? (ex past events vs future events)
        field: 'start_date', // This is the date field the switcher will use to filter on
        nonArchiveText: 'Future', // This is the label for items where the date set in `field` is in the future (or now exactly).
        archiveText: 'Past' // This is the label for items where the date set in `field` is in the past.
    },
    defaultSort: { field: 'id', desc: false }, // What should the default sort be? Should be 'sort' if sortable is true above
    itemsPerPage: 6, // How many items should I display on a page? Set to null to disable pagination.
    views: {
        displayType: 'switch', // How should I display the items? Options: table, grid, or switch to show a switcher
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
                { heading: '', name: 'photo', displayType: 'image', altProp: 'name', noSort: true },
                { heading: 'Name', name: 'name' },
                { heading: 'Type', name: 'type' },
                { heading: 'Active', name: 'radio', displayType: 'boolean', alignment: 'center' }
            ],
            showId: true // Should I show the ID column? (recommended if default sorting is by ID)
        },
        grid: {
            /**
            What fields would you like in the grid view?

            layout properties:
            -----------------
            heading: Text displayed at the top of the table
            name: prop identifier (defined in itemProps)
            displayType (optional, default: 'text'): define a special display type [image-fullwidth | boolean-labelright | concat | text]
            altProp (optional, default: 'Table photo'): used by the image displayType in the alt tag
            length (optional, default: 100): used by the concat displayType as the cut-off point
            **/
            layout: [
                { heading: '', name: 'photo', displayType: 'image-fullwidth', altProp: 'name' },
                { heading: 'Name', name: 'name', gridTag: 'h2' },
                { heading: 'Type', name: 'type', gridTag: 'h4' },
                { heading: 'Date', name: 'start_date', gridTag: 'p', displayType: 'date' },
                { heading: 'Active', name: 'radio', displayType: 'boolean-labelright' }
            ],
            showId: true // Should I show the item ID in the bottom-left corner of the card?
        }
    },
    // This is how the modal grid will be displayed. The root array is the rows and the child array sets the columns. Use property name's.
    modalGrid: [
        ['name'],
        ['slug', 'tags'],
        ['photo', 'radio'],
        ['start_date', 'checkbox'],
        ['example'],
        ['copy'],
        ['type', 'country', 'canada']
    ],
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
            name: 'slug',
            label: 'Slug',
            type: 'text',
            required: true,
            regexFormat: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            regexErrorText: 'Slugs cannot contain spaces or special characters'
        },
        {
            name: 'type',
            label: 'Dropdown',
            type: 'dropdown',
            options: [
                { value: 'foo', label: 'Foo' },
                { value: 'baz', label: 'Baz' },
                { value: 'bar', label: 'Bar' }
            ]
        },
        {
            name: 'radio',
            label: 'Active',
            type: 'radio',
            options: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' }
            ]
        },
        {
            name: 'photo',
            label: 'Photo',
            type: 'photo'
        },
        {
            name: 'start_date',
            label: 'Start Date',
            type: 'datepicker',
            showTime: true,
            timeInterval: 15
        },
        {
            name: 'checkbox',
            label: 'Check this box!',
            type: 'checkbox'
        },
        {
            name: 'example',
            label: 'Textarea',
            type: 'textarea',
            rows: 10
        },
        {
            name: 'tags',
            label: 'Tags',
            type: 'tags'
        },
        {
            name: 'copy',
            label: 'RTE',
            type: 'rte'
        },
        {
            name: 'country',
            label: 'Dropdown w/ multiple',
            type: 'dropdown',
            multiple: true,
            options: [
                { value: 'usa', label: 'USA' },
                { value: 'canada', label: 'Canada' },
                { value: 'mexico', label: 'Mexico' },
                { value: 'england', label: 'England' },
                { value: 'scottland', label: 'Scottland' },
                { value: 'ireland', label: 'Ireland' }
            ]
        },
        {
            name: 'canada',
            label: 'Canadian Providance?',
            type: 'dropdown',
            multiple: true,
            source: {
                url: 'https://api.myjson.com/bins/7xq2x',
                labelKey: 'name',
                valueKey: 'abbreviation'
            },
            helpText: '(from ext datasource)'
        }
    ]
};

export default config;