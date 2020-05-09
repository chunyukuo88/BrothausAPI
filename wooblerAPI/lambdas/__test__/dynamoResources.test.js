import Dynamo from '../common/dynamoResources';
import DocumentClient from 'aws-sdk/clients/dynamodb';
import AWS from 'aws-sdk';

jest.mock('aws-sdk', () => {
    return {
        config: {
            update(val){},
        },
        DynamoDB: {
            DocumentClient: function(){
                return {
                    async get(params) {
                        return {
                            promise(){
                                if (  !params.Key 
                                    || params.tableName !== 'science-facts'){
                                    return { Item: undefined};
                                }
                                return {"Item":
                                        {"category":"Serverless",
                                         "fact":"Serverless Offline is tricky.",
                                         "ID":"1"}
                                };
                            }
                        }
                    }
                }
            }
        }
    };
});


beforeEach(() =>{
    jest.clearAllMocks();
});

describe('dynamoResources.js', ()=>{
    describe('When given valid inputs, ', ()=>{
        test('it returns data from DynamoDB.', async ()=>{
            const ID = 1;
            const myTable = process.env.tableName;
            const successfulResponse = {
                category: 'Serverless',
                fact: 'Serverless Offline is tricky.',
                ID: 1
            };
            const result = await Dynamo.get(ID, myTable);
            expect(result).toBe(successfulResponse);
        });
    });
});