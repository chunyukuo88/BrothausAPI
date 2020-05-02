import { handler } from './getFactHandler';

describe('getFactHandler.js: ', ()=>{
    describe('When passed a valid http request, ', () => {
        it('return the corresponding fact.', () => {
            const url = 'https://k4kkzsszr5.execute-api.us-east-1.amazonaws.com/dev/get-fact/1';
            const response = handler(url);
            const expectedResult = {
                category: "Electronics", 
                fact: "The best-selling integrated circuit of all time is the 555 timer, invented in 1979!" 
            };
            expectedResult(response.fact).toBe(expectedResult.fact);
        });
    });
});