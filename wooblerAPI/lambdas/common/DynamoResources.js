import AWS from 'aws-sdk';

const documentClient = new AWS.DynamoDB.DocumentClient();
const Dynamo = {
    async get (ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID
            }
        }

        const data = await documentClient
                            .get(params)
                            .promise();
        
        if (!data || !data.Item){
            throw Error(`Unable to fetch data with ID ${ID} from ${TableName}`);
        } else {
            return data;
        }
    }
};

export default Dynamo;