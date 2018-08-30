import FieldMultiValues from './field-multi-values';

it('FieldMultiValues matches snapshot', () => {
    const props = {
        name: 'test-field',
        allValue: ['val1', 'val2', 'val3'],
        actions: {
            multiItemSortEnd: () => {}
        }
    };

    const wrapper = shallow(<FieldMultiValues {...props} />);
    expect(wrapper).toMatchSnapshot();
});