import Responses from '../API_Responses';
import { S3 } from '../common/S3';

const bucket = process.env.bucketName; //Pulling the table name from our serverless.yml file!

exports.handler = async httpRequest => {
    
    const fileName = httpRequest.pathParameters.fileName;
    const data = JSON.parse(httpRequest.body);
    const data = httpRequest.body;

    if (   !httpRequest.pathParameters 
        || !httpRequest.pathParameters.fileName){
        return Responses._400({message: 'The path is missing a file name.'});
    }
    

    const newData = await S3.writeToS3(data, fileName, bucket)
                             .catch(error => {
                                 console.log(`Error occurred while trying to write to S3 bucket: ${error}`);
                                 return null;
                            });
    return (!newData) ? Responses._400({message: `Operation failed like no one's business.`}) :
                     Responses._200({newData});
};