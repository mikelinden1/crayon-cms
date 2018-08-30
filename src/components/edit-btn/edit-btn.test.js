import EditBtn from './edit-btn';
import sinon from 'sinon';

const props = {
    item: {
        name: 'test'
    },
    config: {
        capabilities: {
            editable: true
        }
    },
     actions: {
        editItem: () => {}
     }
};

it('EditBtn matches snapshot', () => {
    const wrapper = shallow(<EditBtn {...props} />);
    expect(wrapper).toMatchSnapshot();
});

it('EditBtn doesn\'t display if editable not set', () => {
    const propsNoEdit = {
        ...props,
        config: {
            capabilities: {
                editable: false
            }
        }
    };

    const wrapper = shallow(<EditBtn {...propsNoEdit} />);
    expect(wrapper.type()).toEqual(null)
});

it('EditBtn calls editItem and sends the item', () => {
    const spy = sinon.spy();
    const propsWithSpy = {
        ...props,
        actions: {
            editItem: spy
        }
    };

    const wrapper = mount(<EditBtn {...propsWithSpy} />);
    wrapper.find('Button').first().simulate('click');

    expect(spy.calledOnce).toBeTruthy();
    expect(spy.getCall(0).args[0]).toEqual(propsWithSpy.item);
});