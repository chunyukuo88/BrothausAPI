import Responses from '../API_Responses';
import Dynamo from '../common/DynamoResources';
import { v4 as uuidv4 } from 'uuid';

const TableName = process.env.tableName; //Pulling the table name from our serverless.yml file!

exports.handler = async httpRequest => {
    
    const category = JSON.parse(httpRequest.category);
    const factData = JSON.parse(httpRequest.fact);
    const id = uuidv4();

    let fact = {};
    fact.ID = id;
    fact.category = category;
    fact.data = factData;

    const newFact = await Dynamo.write(fact, TableName)
                                .catch(error => {
                                    console.log(error);
                                    return null;
                                });
    
    if (!newFact) {
        return Responses._400({ message: 'Failed to add new fact.' });
    } else {
        return Responses._200({ newFact });
    }
}
