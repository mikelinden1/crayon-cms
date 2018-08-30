import CheckboxField from './checkbox-field';

const props = {
    name: 'test',
    label: 'Test',
    value: true,
    onChange: () => {},
    disabled: false
};

it('CheckboxField matches snapshot', () => {
    const wrapper = shallow(<CheckboxField {...props} />);
    expect(wrapper).toMatchSnapshot();
});
