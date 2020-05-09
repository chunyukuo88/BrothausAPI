const _ = require('lodash');

export const conf = (envJson) => {
    const envConfigData = getConfForEnv(envJson);
    return replaceTokens(envConfigData);
};

const getConfForEnv = (envJson) => {
    const nodeEnv = process.env.NODE_ENV;
    return envJson[nodeEnv];
};

const replaceTokens = (envJson) => {
    const confData = _.cloneDeep(envJson);
    const user = process.env.USER;
    const confDataString = JSON.stringify(confData);
    return JSON.parse(confDataString.replace(/##userName##/g, user));
};