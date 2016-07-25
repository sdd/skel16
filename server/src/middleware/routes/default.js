import template from '../../../templates/default';
import debug from 'debug';
const d = debug('defaultRoute');

// Default route handler. Ignores any routes that begin with /assets, as the asset
// handling route will serve either the asset or a 404 for those paths.
// If none of the downstream middleware add a body to the response, this route will
// render the default template. This is usually what you want in an SPA that handles
// it's own internal routing client-side. If you need a specific route to serve a real
// 404 response, then you need to use ctx.throw(404) in a route downstream from this.
// the error-handler middleware will catch the error and serve a 404 error page.

export default () => async (ctx, next) => {

    // ignore asset paths - always want a 404 for missing asset rather than default route
    if (!ctx.path.match(/^\/assets/)) {

        d('non-asset path - passing to downstream middleware');

        await next();

        if (!ctx.body) {

            d('no body from downstream middleware');

            if (ctx.accepts('html')) {
                d('rendering default');

                ctx.body = template();
                ctx.type = 'text/html; charset=utf-8';
            } else {
                // if non-HTML request, just 404.
            }
        } else {
            d('body generated downstream - doing nothing');
        }
    } else {
        d('asset path - ignoring');
        return next();
    }
}
