import { handler } from '../endpoints/getDbFact';
import Dynamo from '../common/DynamoResources';
import Responses from '../API_Responses';

const mockResponseWithFact = {
    "retrievedFact": {
        "category": "Serverless",
        "fact": "Serverless Offline is tricky.",
        "ID": "1"
    }
};
const mockErrorResponse = { message: 'Failed to retrieve fact.' };
jest.mock('../common/DynamoResources');
const mockDb = Dynamo.get = jest.fn() 
const myTable = process.env.tableName; //Pulling the table name from our serverless.yml file!

describe('getDbFact.js: ', ()=>{
    beforeEach(() =>{
        jest.clearAllMocks();
    });
    describe('When given a valid http request, ', ()=>{
        const httpRequest = {
            pathParameters: {
                ID: 1
            }
        };
        test('the handler invokes the retrieveFact() method of DynamoResources.js.', ()=>{
            handler(httpRequest);
            expect(Dynamo.get).toHaveBeenCalledTimes(1);
        });
        test('the handler returns the corresponding fact.', async ()=>{
            mockDb.mockReturnValue(mockResponseWithFact)
            const result = await handler(httpRequest);
            expect(result).toEqual(Responses._200(mockResponseWithFact));
        });
    });
    describe('When given an invalid http request, ', ()=>{
        describe('such as a missing or non-integer ID, ', ()=>{
            test('return a 400 error code.', async ()=>{
                mockDb.mockReturnValue(mockErrorResponse);
                const invalidRequest = {
                    pathParameters: {ID: 'rubbish'}
                };
                const result = await handler(invalidRequest);
                expect(result.statusCode).toBe(400);
            });
        });
        // describe('such as an ID that does not yet exist in DynamoDB, ', ()=>{
        //     test('return a 400 error code.', async ()=>{
        //         mockDb.mockReturnValue(mockErrorResponse);
        //         const invalidRequest = {
        //             pathParameters: {
        //                 ID: 8000
        //             }
        //         };
        //         const result = await handler(invalidRequest);
        //         console.log(result);
        //         expect(result).toEqual(Responses._400(mockErrorResponse));
        //     });
        // });
    });
});