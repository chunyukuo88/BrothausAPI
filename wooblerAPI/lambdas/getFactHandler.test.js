import { handler } from './getFactHandler';

describe('getFactHandler.js: ', ()=>{
    describe('When passed a valid http request, ', () => {
        it('return the corresponding fact.', async () => {
            const httpRequest = {
                'pathParameters': {
                    'ID': '1'
                }
            };
            const response = await handler(httpRequest);
            console.log(response);
            expect(response.statusCode).toBe(200);
        });
    });
});