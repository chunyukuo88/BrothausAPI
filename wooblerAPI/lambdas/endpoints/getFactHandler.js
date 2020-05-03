import Responses from '../API_Responses';
import data from '../Facts';

exports.handler = async httpRequest => {
    
    if (!httpRequest.pathParameters || !httpRequest.pathParameters.ID){
        return Responses._400({message: 'The path is missing an ID.'});
    }
    const id = httpRequest.pathParameters.ID;

    return (data[id]) ? Responses._200(data[id]) : 
                        Responses._400({message: 'There is no ID in the data.'}); 
}
