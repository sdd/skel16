import path from 'path';
import envalid, { num, str, bool, url } from 'envalid';
import pick from 'lodash/pick';

const params = {
    SERVER_PORT: num({
        desc: 'the port at which the server will listen',
        default: 3000
    }),
    DEV_PROXY_ENABLED: bool({
        desc: 'whether to proxy to webpack-dev-server in dev mode',
        default: true
    }),
    DEV_PROXY_URL: url({
        desc: 'the URL of webpack-dev-server when in dev mode',
        default: 'http://localhost:8080'
    }),
    PUBLIC_PATH: str({
        desc: 'path to the dir containing public files',
        default: '../client/dist'
    }),
    SERVER_ROOT: str({
        desc: 'path to server root',
        default: path.resolve(__dirname, '..')
    })
};

// envalid returns the entirety of process.env by default.
// I'm only interested in the keys from params, and isDev.
export default pick(
    envalid.cleanEnv(process.env, params),
    Object.keys(params).concat(['isDev'])
);
