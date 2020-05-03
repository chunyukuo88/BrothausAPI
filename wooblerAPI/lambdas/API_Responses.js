const Responses = {
    _200(data = {}){
        return {
            headers: _getHeaders(),
            statusCode: 200,
            body: JSON.stringify(data)
        };
    },

    _400(data = {}){
        return {
            headers: _getHeaders(),
            statusCode: 400,
            body: JSON.stringify(data)
        }
    }
};

function _getHeaders(){
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
    };
};

module.exports = Responses;