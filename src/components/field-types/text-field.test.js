import TextField from './textarea-field';

const props = {
    name: 'test',
    value: 'value',
    onChange: () => {},
    disabled: false
};

it('TextField matches snapshot', () => {
    const wrapper = shallow(<TextField {...props} />);
    expect(wrapper).toMatchSnapshot();
});
