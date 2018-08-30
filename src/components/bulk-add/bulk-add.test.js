import BulkAdd from './bulk-add';
import config from 'config-sample/widget-config';
import sinon from 'sinon';

const props = {
    columns: [],
    open: true,
    adding: false,
    config,
    actions: {
        setColumns: () => {},
        addColumn: () => {},
        closeDialog: () => {},
        openDialog: () => {},
        throwBulkError: () => {},
        save: () => {}
    }
};

it('BulkAdd matches snapshot', () => {
    const wrapper = shallow(<BulkAdd {...props} />);
    expect(wrapper).toMatchSnapshot();
});

