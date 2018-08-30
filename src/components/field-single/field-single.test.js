import FieldSingle from './field-single';

it('FieldSingle matches snapshot', () => {
    const props = {
        name: 'test-field',
        actions: {
            setItemProp: () => {},
            validateOnChange: () => {}
        }
    };

    const wrapper = shallow(<FieldSingle {...props} />);
    expect(wrapper).toMatchSnapshot();
});