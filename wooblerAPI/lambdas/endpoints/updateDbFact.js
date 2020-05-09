import Responses from '../API_Responses';
import * as dynamo from '../common/dynamoResources';
import yup from 'yup';

const tableName = process.env.tableName; //Pulling the table name from our serverless.yml file!
const bodySchema = yup.object().shape()({
    fact: yup.number().required(),
});

exports.handler = async httpRequest => {
    const ID = httpRequest.pathParameters.ID;
    const { fact } = httpRequest.body;

    const response = await dynamo.update({
        tableName,
        primaryKey: 'ID',
        primaryKeyValue: ID,
        updateKey: 'fact',
        updateValue: fact
    });

    return Responses._200(response);
}