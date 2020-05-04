import { handler } from '../endpoints/getDbFact';
import { DynamoResources } from '../common/DynamoResources';

const mockResponseWithFact = {
    "newFact": {
        "category": "Serverless",
        "fact": "Serverless Offline is tricky.",
        "ID": "1"
    }
};
jest.mock('../common/DynamoResources');
const mockDynamoGet = DynamoResources.prototype.get = jest.fn();

describe('getDbFact.js: ', ()=>{
    beforeEach(() =>{
        jest.clearAllMocks();
    });
    describe('When given a valid http request, ', ()=>{
        test('return a fact from DynamoDB.', async ()=>{
            const tableName = process.env.tableName;
            const req = {
                'pathParameters': { 
                    'TableName' : tableName,
                    'ID' : '1' 
                }
            };
            mockDynamoGet.mockReturnValueOnce(
                mockResponseWithFact
            );
            const response = await handler(req);
            expect(response.statusCode).toBe(200);
        });
    });
});