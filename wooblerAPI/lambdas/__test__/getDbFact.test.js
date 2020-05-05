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
            // Dynamo.get = jest.fn(()=> mockResponseWithFact);
            mockDb.mockReturnValue(mockResponseWithFact)
            const result = await handler(httpRequest);
            expect(result).toEqual(Responses._200(mockResponseWithFact));
        });
    });
});