import DropdownField from './dropdown-field';

const props = {
    name: 'test',
    value: 'val1',
    options: [
        { label: 'val1', value: 'val1'},
        { label: 'val2', value: 'val2'},
        { label: 'val3', value: 'val3'}
    ],
    onChange: () => {},
    disabled: false,
    actions: {
        fetchDatasource: () => {}
    }
};

it('DropdownField matches snapshot', () => {
    const wrapper = shallow(<DropdownField {...props} />);
    expect(wrapper).toMatchSnapshot();
});
