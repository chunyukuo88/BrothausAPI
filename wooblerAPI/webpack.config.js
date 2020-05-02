//This file allows Serverless to create the build with Webpack.
module.exports = {
    target: 'node',
    mode: 'none' // Using 'production' will add extra processing to minify the code. 
// That's good for final builds but outside a production environment the downside is that
// it makes the code less readable in the Lambda section of the AWS console.
};