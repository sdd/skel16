import config from './config';
import Koa from 'koa';
import middleware from './middleware';
import chalk from 'chalk';

const app = new Koa();
app.use(middleware(config));

if (!module.parent) {
    app.listen(config.SERVER_PORT);
    console.log(chalk.green(`server listening on port ${config.SERVER_PORT}`));
} else {
    module.exports = app;
}
