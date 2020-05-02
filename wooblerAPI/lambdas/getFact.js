const Responses = require('./API_Responses');

exports.handler = async event => {
    console.log('event: ', event);

    if (!event.pathParameters || !event.pathParameters.ID){
        return Responses._400({message: 'The path is missing the ID.'});
    }

    let ID = event.pathParameters.ID;

    if(data[ID]){
        return Responses._200(data[ID]); 
    }

    return Responses._400({message: 'There is no ID in the data.'});
}

const data = {
    1: { category: "Electronics", fact: "The best-selling integrated circuit of all time is the 555 timer, invented in 1979!" },
    2: { category: "Astronomy", fact: "The hottest planet in our solar system is not Mercury but Venus." },
    3: { category: "Software", fact: "YAML is a markup language that is considered a 'recursive abbreviation.' Which is to say, it stands for YAML Ain't Markup Language!" }
};