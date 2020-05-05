import { handler } from '../endpoints/getDbFact';
import * as dynamo from '../common/DynamoResources';

const mockResponseWithFact = {"newFact": {"category": "Serverless","fact": "Serverless Offline is tricky.","ID": "1"}};
jest.mock('../common/DynamoResources');
const tableName = process.env.tableName; //Pulling the table name from our serverless.yml file!

describe('getDbFact.js: ', ()=>{
    beforeEach(() =>{
        jest.clearAllMocks();
    });
    describe('When given a valid http request, ', ()=>{
        test('the handler invokes the get() method of DynamoResources.js.', async ()=>{
            const httpRequest = {
                pathParameters: {
                    TableName: tableName,
                    ID: 1
                }
            };
            handler(httpRequest);
            expect(dynamo.get).toHaveBeenCalledTimes(1);
        });
    });
});