import PasswordField from './password-field';

const props = {
    name: 'test',
    value: 'value',
    onChange: () => {},
    disabled: false
};

it('PasswordField matches snapshot', () => {
    const wrapper = shallow(<PasswordField {...props} />);
    expect(wrapper).toMatchSnapshot();
});
