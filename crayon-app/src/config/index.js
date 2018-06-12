import WidgetConfig from './widget-config';
import BitConfig from './bit-config';

const config = {
    clientName: 'Mike\'s Company',
    siteUrl: 'http://mikelinden.com',
    apiBase: 'http://rest.learncode.academy/api/crayon',
    moduleOrder: ['bits', 'widgets'],
    modules: {
        widgets: WidgetConfig,
        bits: BitConfig
    }
};

export default config;