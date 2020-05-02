const Responses = require('./API_Responses');
const data = require('./Facts');

exports.handler = async httpRequest => {

    const id = httpRequest.pathParameters.ID;

    if (!httpRequest.pathParameters || !id){
        return Responses._400({message: 'The path is missing an ID.'});
    }

    return (data[id]) ? Responses._200(data[id]) : 
                        Responses._400({message: 'There is no ID in the data.'}); 
}