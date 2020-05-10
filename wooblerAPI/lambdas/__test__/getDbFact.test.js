import { handler } from '../endpoints/getDbFact';
import * as dynamo from '../common/DynamoResources';

const mockResponseWithFact = {
    "newFact": {
        "category": "Serverless",
        "fact": "Serverless Offline is tricky.",
        "ID": "1"
    }
};
jest.mock('../common/DynamoResources');
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
            expect(dynamo.retrieveFact).toHaveBeenCalledTimes(1);
        });
        test('the handler returns the corresponding fact.', async ()=>{
            dynamo.retrieveFact = jest.fn(()=> mockResponseWithFact);
            const result = await handler(httpRequest);
            expect(result).toBe(mockResponseWithFact);
        });
    });
});