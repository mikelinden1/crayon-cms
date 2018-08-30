import AddNew from './add-new';
import sinon from 'sinon';

const props = {
    config: {
        itemName: 'Test'
    },
    actions: {
        openItemModal: () => {}
    }
};

it('AddNew matches snapshot', () => {
    const wrapper = shallow(<AddNew {...props} />);
    expect(wrapper).toMatchSnapshot();
});

it('Displays the correct itemName', () => {
    const propsWithJumbotron = {
        ...props,
        displayAsJumbotron: true
    };

    const wrapper = mount(<AddNew {...propsWithJumbotron} />);
    const text = wrapper.find('Button').text();

    expect(text).toEqual(`Add The First ${wrapper.props().config.itemName}`)
});

it('Calls openItemModal onClick', () => {
    const spy = sinon.spy();

    const propsWithSpy = {
        ...props,
        actions: {
            openItemModal: spy
        }
    };

    const wrapper = mount(<AddNew {...propsWithSpy} />);
    wrapper.find('button').simulate('click');

    expect(spy.calledOnce).toBeTruthy();
});