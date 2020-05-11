const Responses = require('../common/API_Responses');
const S3 = require('../common/S3');

const bucket = process.env.bucketName;

exports.handler = async httpRequest => {
    if (!httpRequest.pathParameters || !httpRequest.pathParameters.fileName) {
        return Responses._400({ message: 'missing the fileName from the path' });
    }

    let fileName = httpRequest.pathParameters.fileName;
    const data = JSON.parse(httpRequest.body);

    const newData = await S3.write(data, fileName, bucket).catch(err => {
        console.log('error in S3 write', err);
        return null;
    });

    return (!newData) ? Responses._400({ message: 'Failed to write data by filename' }) :
                        Responses._200({ newData });
};