import TextAreaField from './textarea-field';

const props = {
    name: 'test',
    value: 'value',
    onChange: () => {},
    disabled: false
};

it('TextAreaField matches snapshot', () => {
    const wrapper = shallow(<TextAreaField {...props} />);
    expect(wrapper).toMatchSnapshot();
});
