import TagsField from './tags-field';

const props = {
    name: 'test',
    value: ['val1', 'val2', 'val3'],
    onChange: () => {},
    disabled: false
};

it('TagsField matches snapshot', () => {
    const wrapper = shallow(<TagsField {...props} />);
    expect(wrapper).toMatchSnapshot();
});
