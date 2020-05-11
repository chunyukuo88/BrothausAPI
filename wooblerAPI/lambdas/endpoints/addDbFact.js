import Responses from '../common/API_Responses';
import {Dynamo} from '../common/DynamoResources';

const tableName = process.env.tableName; //Pulling the table name from our serverless.yml file!

exports.handler = async httpRequest => {
    
    if (!httpRequest.pathParameters || !httpRequest.pathParameters.ID){
        return Responses._400({message: 'The path is missing an ID.'});
    }
    
    const ID = httpRequest.pathParameters.ID;
    const fact = JSON.parse(httpRequest.body);
    fact.ID = ID;

    const newFact = await Dynamo.addFact(fact, tableName)
                                .catch(error => {
                                    console.log(`Error in DynamoDB write: ${error}`);
                                    return null;
                                });
    if (!newFact)
        return Responses._400({ message: 'Failed to get fact by ID.' });
    return Responses._200( { newFact });
};