import RadioField from './radio-field';

const props = {
    name: 'test',
    value: 'val1',
    options: [
        { label: 'val1', value: 'val1'},
        { label: 'val2', value: 'val2'},
        { label: 'val3', value: 'val3'}
    ],
    onChange: () => {},
    disabled: false
};

it('RadioField matches snapshot', () => {
    const wrapper = shallow(<RadioField {...props} />);
    expect(wrapper).toMatchSnapshot();
});
