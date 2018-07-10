import WidgetConfig from './widget-config';
import BitConfig from './bit-config';
import UsersConfig from './users-config';

const config = {
    clientName: 'Crayon CMS',
    moduleOrder: ['widgets', 'widgets', 'users'],
    modules: {
        widgets: WidgetConfig,
        bits: BitConfig,
        users: UsersConfig
    }
};

export default config;