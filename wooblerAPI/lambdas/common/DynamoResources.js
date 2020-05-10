import AWS from 'aws-sdk';

const documentClient = new AWS.DynamoDB.DocumentClient();

export const Dynamo = {
        
    async retrieveFact(ID, TableName) {
        const parameters = {
            TableName,
            Key: {
                ID
            }
        };
        const data = await documentClient.get(parameters).promise();
        if (!data || !data.Item)
            throw Error(`Unable to fetch data with ID ${ID} from ${TableName}`);
        return data;
    },

    async addFact(data, TableName){
        if (!data.ID)
            throw Error('There is no ID in the data.');
        
        const parameters = {
            TableName,
            Item: data
        };
        const response = await documentClient.put(parameters).promise();
        
        if (!response)
            throw Error(`There was an error inserting an ${data.ID} into table ${TableName}.`);
        return data;
    }
}
