import PhotoField from './photo-field';

const props = {
    name: 'test',
    value: 'val1',
    label: 'Test',
    onChange: () => {},
    showMediaPicker: () => {},
    disabled: false
};

it('PhotoField matches snapshot', () => {
    const wrapper = shallow(<PhotoField {...props} />);
    expect(wrapper).toMatchSnapshot();
});
