import BulkAdd from './bulk-add';
import configSample from 'config-sample/widget-config';

const props = {
    columns: [],
    open: true,
    adding: false,
    config: configSample,
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
    const wrapper = mount(<BulkAdd {...props} />);
    expect(wrapper).toMatchSnapshot();
});