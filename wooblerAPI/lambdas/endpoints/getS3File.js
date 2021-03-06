const Responses = require('../common/API_Responses');
const S3 = require('../common/S3');

const bucket = process.env.bucketName;

exports.handler = async httpRequest => {
    if (!httpRequest.pathParameters || !httpRequest.pathParameters.fileName) {
        return Responses._400({ message: 'missing the fileName from the path' });
    }

    let fileName = httpRequest.pathParameters.fileName;

    const retrievedFile = await S3.get(fileName, bucket).catch(err => {
        console.log('error in S3 get', err);
        return null;
    });

    return (!retrievedFile) ? Responses._400({ message: 'Failed to read data by filename' }) :
                              Responses._200({ retrievedFile });
};