import { handler } from '../endpoints/getFactHandler';

describe('getFactHandler.js: ', ()=>{
    describe('When passed a valid http request, ', () => {
        it('return the corresponding fact.', async () => {
            const httpRequest = {
                'pathParameters': { 'ID': '1'}
            };
            const response = await handler(httpRequest);
            expect(response.statusCode).toBe(200);
        });
    });
    describe('When passed an invalid http request, ', () => {
        it('returns an error code 400.', async () => {
            const httpRequest = {
                'pathParameters': { 'ID': 'Chuck Norris'}
            };
            const response = await handler(httpRequest);
            expect(response.statusCode).toBe(400);
        });
    });

});