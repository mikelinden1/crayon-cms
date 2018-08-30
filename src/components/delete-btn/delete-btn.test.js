import DeleteBtn from './delete-btn';
import sinon from 'sinon';

const props = {
    item: {
        name: 'test'
    },
    config: {
        capabilities: {
            deleteable: true
        }
    },
     actions: {
         deleteItem: () => {}
     }
};

it('DeleteBtn matches snapshot', () => {
    const wrapper = shallow(<DeleteBtn {...props} />);
    expect(wrapper).toMatchSnapshot();
});

it('DeleteBtn doesn\'t display if deleteable not set', () => {
    const propsNoDelete = {
        ...props,
        config: {
            capabilities: {
                deleteable: false
            }
        }
    };

    const wrapper = shallow(<DeleteBtn {...propsNoDelete} />);
    expect(wrapper.type()).toEqual(null)
});

it('DeleteBtn calls deleteItem and sends the item', () => {
    const spy = sinon.spy();
    const propsWithSpy = {
        ...props,
        actions: {
            deleteItem: spy
        }
    };

    const wrapper = mount(<DeleteBtn {...propsWithSpy} />);
    wrapper.find('Button').first().simulate('click');

    expect(spy.calledOnce).toBeTruthy();
    expect(spy.getCall(0).args[0]).toEqual(propsWithSpy.item);
});

it('DeleteBtn shows a spinner when deleting', () => {
    const spy = sinon.spy();
    const propsWithDeleting = {
        ...props,
        item: {
            ...props.item,
            deleting: true
        }
    };

    const wrapper = shallow(<DeleteBtn {...propsWithDeleting} />);
    expect(wrapper).toMatchSnapshot();
});