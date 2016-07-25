import compose from 'koa-compose';
import logger from 'koa-logger';
import errorHandler from './error-handler';

import routes from './routes';

export default config => compose([

    logger(),
    errorHandler(config),

    routes(config)
]);
