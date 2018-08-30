import ItemModal from './item-modal';
import sinon from 'sinon';

const props = {
    open: true,
    newItem: {},
    config: {
        itemProps: [
            { name: 'name', type: 'text' },
            { name: 'dropdown', type: 'dropdown', options: [{ value: 'val1', label: 'Val1' }, { value: 'val2', label: 'Val2' }] }
        ],
        itemName: 'Test'
    },
    currentModule: 'widgets',
    actions: {
        saveNewItem: () => {},
        saveEditItem: () => {},
        closeItemModal: () => {}
    }
};

it('ItemModal matches snapshot', () => {
    const wrapper = shallow(<ItemModal {...props} />);
    expect(wrapper).toMatchSnapshot();
});

// it('ItemModal closes the modal on cancel', () => {
//     const spy = sinon.spy();
//     props.actions.closeItemModal = spy;

//     const store = mockStore({});

//     const wrapper = mountWrap(
//         <Provider store={store}>
//             <ItemModal {...props} />
//         </Provider>
//     );

//     wrapper.find('.cancel-btn').simulate('click');

//     expect(spy.calledOnce).toBeTruthy();
// });