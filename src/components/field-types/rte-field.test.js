import RteField from './rte-field';

const props = {
    name: 'test',
    value: '<p>test</p>',
    onChange: () => {},
    disabled: false
};

it('RteField matches snapshot', () => {
    const wrapper = shallow(<RteField {...props} />);
    expect(wrapper).toMatchSnapshot();
});
