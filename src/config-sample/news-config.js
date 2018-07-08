import { faNewspaper } from '@fortawesome/fontawesome-free-solid';

const config = {
    id: 'news',
    moduleName: 'Manage News', // Displayed at the top of the module
    icon: faNewspaper,
    itemName: 'Story', // What are items called? (displayed in modal, delete confirmation, etc)
    itemNamePlural: 'Stories', // How do I say that in the plural form?
    capabilities: {
        reorderable: false, // Can the user reorder items? If yes, sorting will be disabled.
        editable: true, // Can the user edit items?
        deleteable: true, // Can the user delete items?
        deleteIdProp: 'headline', // Property used in the delete confirm dialog (default to 'name' if not set)
        bulkImport: true
    },
    filtering: {
        searchFields: ['headline', 'slug', 'teaser'], // Which fields should be searchable?
        filterFields: null, // Which fields should have filtering dropdowns displayed?
        sortable: true // Can the user sort the items in the display? Not available if reorderable is on.
    },
    archive: { // Do you want to show a switcher based on a date field? (ex past events vs future events)
        field: 'archive_date', // This is the date field the switcher will use to filter on
        nonArchiveText: 'Current', // This is the label for items where the date set in `field` is in the future (or now exactly).
        archiveText: 'Archived' // This is the label for items where the date set in `field` is in the past.
    },
    defaultSort: { field: 'publish_date', desc: false }, // What should the default sort be? Should be 'sort' if sortable is true above
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
                { heading: 'Headline', name: 'headline' },
                { heading: 'Publish Date', name: 'publish_date', displayType: 'datetime' }
            ],
            showId: true // Should I show the ID column? (recommended if default sorting is by ID)
        },
        grid: null
    },
    // This is how the modal grid will be displayed. The root array is the rows and the child array sets the columns. Use property name's.
    modalGrid: [
        ['headline'],
        ['slug'],
        ['publish_date', 'archive_date'],
        ['photo'],
        ['teaser'],
        ['copy']
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
                    nested: property the data is nested under (optional)
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
            name: 'headline',
            label: 'Headline',
            type: 'text',
            required: true,
            minLength: 3,
            maxLength: 50
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
            name: 'photo',
            label: 'Photo',
            type: 'photo'
        },
        {
            name: 'publish_date',
            label: 'Publish Date',
            type: 'datepicker',
            showTime: true,
            timeInterval: 15
        },
        {
            name: 'archive_date',
            label: 'Archive Date',
            type: 'datepicker',
            showTime: true,
            timeInterval: 15
        },
        {
            name: 'teaser',
            label: 'Teaser',
            type: 'textarea',
            rows: 6
        },
        {
            name: 'copy',
            label: 'RTE',
            type: 'rte'
        }
    ]
};

export default config;