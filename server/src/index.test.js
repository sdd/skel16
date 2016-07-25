import { expect } from 'chai';

describe('sanity check', () => {

    it('should be able to run a test', () => {
        expect(true).to.be.true;
    });

    it('server starts properly', () => {
        const app = require('.');
        expect(app).to.exist;
    });
});
