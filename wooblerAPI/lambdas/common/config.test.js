import { conf } from './config';

describe('config.js', ()=>{
    describe('node_env is set', ()=>{
        it('returns correct data from config', ()=>{
            const env = require('../common/env.json');
            process.env.NODE_ENV = 'unit_test';
            const expected = 'DO NOT REMOVE';
            const config = conf(env);
            const result = config.test;
            expect(result).toBe(expected);
        });
    });
});