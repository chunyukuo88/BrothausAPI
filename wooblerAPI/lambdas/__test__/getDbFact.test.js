import { handler } from '../endpoints/getDbFact';



describe('getDbFact.js: ', ()=>{
    describe('When given a valid http request, ', ()=>{
        test('return a fact from DynamoDB.', async ()=>{
            const tableName = process.env.tableName;
                                                                                                                     bbbdf ccc                                                                             const req = {
                'pathParameters': { 
                    'TableName' : tableName,
                    'ID' : '1' 
                }
            };
            const response = await handler(req);
            expect(response.statusCode).toBe(200);
        });
    });
});