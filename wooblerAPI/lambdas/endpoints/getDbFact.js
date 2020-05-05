import Responses from '../API_Responses';
import Dynamo from '../common/DynamoResources';

const tableName = process.env.tableName; //Pulling the table name from our serverless.yml file!

exports.handler = async httpRequest => {
    
    if (!httpRequest.pathParameters || !httpRequest.pathParameters.ID){
        return Responses._400({message: 'The path is missing an ID.'});
    }
    const id = httpRequest.pathParameters.ID;

    const fact = await Dynamo.get(id, tableName);
                             
    return (!fact) ? Responses._400({message: 'Failed to retrieve fact.'}) :
                     Responses._200(fact);
}