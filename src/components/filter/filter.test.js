import Filter from './filter';

const props = {
    filterVals: { name: 'Mike' },
    filters: [{ name: 'name', label: 'Name' }],
    actions: {
        fetchDatasource: () => {},
        setFilter: () => {}
    }
};

it('Filter matches snapshot', () => {
    const wrapper = shallow(<Filter {...props} />);
    expect(wrapper).toMatchSnapshot();
});