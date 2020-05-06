import Responses from '../API_Responses';
import Dynamo from '../common/DynamoResources';

const tableName = process.env.tableName; //Pulling the table name from our serverless.yml file!

exports.handler = async httpRequest => {
    const params = httpRequest.pathParameters;
    if (   !params 
        || !params.ID
        || parseInt(params.ID) * 0 !== 0){
        return Responses._400({message: 'The path is missing a valid ID.'});
    }
    const id = params.ID;

    const fact = await Dynamo.get(id, tableName);
          
    console.log(`Server response: ${fact}`);
    return (!fact
            || fact === undefined
            ) ? Responses._400({message: 'Failed to retrieve fact.'}) :
                Responses._200(fact);
}