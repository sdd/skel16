import send from 'koa-send';
import path from 'path';
import debug from 'debug';
const d = debug('errorHandler');

module.exports = config => async (ctx, next) => {

    // wrap all downstream middleware in try/catch
    try {
        d('calling downstream middleware');
        await next();
        d('no error');

    } catch (err) {
        d('error caught!');

        ctx.status = err.status || err.statusCode || 500;

        // if the thrown error is 304 not modified or 404 not found,
        // don't pollute the log with an unnecessary stacktrace.
        if (![304, 404].includes(ctx.status)) {
            // eslint-disable-next-line no-console
            console.error(`ERROR: ${err.stack}`);
        }

        // if the request was for html, and the response status
        // is 404 or 500, render an error page
        if (ctx.accepts('html')) {

            const errorPage = ctx.status === 404 ? 404 : 500;
            await send(ctx, `error-${errorPage}.html`,
                { root: path.join(config.SERVER_ROOT, 'static-error-pages') }
            );
            ctx.response.type = 'html';
        } else {
            d('set type to json');
            ctx.response.body = {};
        }
    }
};
