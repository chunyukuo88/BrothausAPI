import AWS from 'aws-sdk';

const S3Client = new AWS.S3();

export const S3 = {

    async getFromS3(){},

    async writeToS3(data, fileName, bucket){
        const params = {
            Bucket: bucket,
            Body: JSON.stringify(data),
            Key: fileName,
        };

        const newData = await S3Client.putObject(params).promise();

        if (!newData){
            throw Error('There was no new data to write to S3.');
        }

        return newData;
    }
}