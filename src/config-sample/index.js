import WidgetConfig from './widget-config';
import BitConfig from './bit-config';
import UsersConfig from './users-config';

const config = {
    clientName: 'Apex Equipment',
    localEnv: {
        siteUrl: 'http://localhost',
        apiBase: 'http://localhost/crayon-php-api',
        uploadPath: '../uploads',
        uploadFullPath: 'http://localhost/uploads'
    },
    prodEnv: {
        siteUrl: 'http://thesiteurl.com',
        apiBase: 'http://thesiteurl.com/crayon-php-api',
        uploadPath: '../uploads',
        uploadFullPath: 'http://thesiteurl.com/uploads'
    },
    moduleOrder: ['widgets', 'widgets', 'users'],
    modules: {
        widgets: WidgetConfig,
        bits: BitConfig,
        users: UsersConfig
    }
};

export default config;