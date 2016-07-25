import compose from 'koa-compose';

import meta from './meta';
import assets from './assets';
import defaultRoute from './default';

export default config => compose([
    meta(config),
    assets(config),
    defaultRoute(config)
]);
