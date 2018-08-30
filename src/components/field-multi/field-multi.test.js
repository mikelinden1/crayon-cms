import FieldMulti from './field-multi';

it('FieldMulti matches snapshot', () => {
    const props = {
        name: 'test-field',
        allValue: ['val1', 'val2', 'val3'],
        actions: {
            setItemProp: () => {},
            setMultiItemProp: () => {}
        }
    };

    const wrapper = shallow(<FieldMulti {...props} />);
    expect(wrapper).toMatchSnapshot();
});