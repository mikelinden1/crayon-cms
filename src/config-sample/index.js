import NewsConfig from './news-config';
import BitConfig from './bit-config';
import UsersConfig from './users-config';

const config = {
    clientName: 'Apex Equipment',
    siteUrl: 'http://apexbalerequipment.com',
    apiBase: 'http://localhost/steve/apex/api',
    uploadPath: '../uploads',
    uploadFullPath: 'http://localhost/steve/apex/uploads',
    moduleOrder: ['news', 'widgets', 'users'],
    modules: {
        news: NewsConfig,
        bits: BitConfig,
        users: UsersConfig
    }
};

export default config;