import GridViewCard from './grid-view-card';

const props = {
    item: { id: 1, name: 'item 1' },
    config: {
        id: 'widgets',
        moduleName: 'Manage Widgets',
        itemName: 'Widget',
        itemNamePlural: 'Widgets',
        capabilities: {
            reorderable: false,
            editable: true,
            deleteable: true,
            deleteIdProp: 'name',
            bulkImport: true
        },
        itemsPerPage: 6,
        views: {
            displayType: 'grid',
            defaultView: 'grid',
            grid: {
                layout: [
                    { heading: 'Name', name: 'name', gridTag: 'h2' }
                ],
                showId: true
            }
        },
        itemProps: [
            {
                name: 'name',
                label: 'Text',
                type: 'text',
                required: true,
                minLength: 3,
                maxLength: 30
            }
        ]
    }
};

it('GridView matches snapshot', () => {
    const wrapper = shallow(<GridViewCard {...props} />);
    expect(wrapper).toMatchSnapshot();
});