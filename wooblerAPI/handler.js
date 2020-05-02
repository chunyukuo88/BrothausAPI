'use strict';

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'This will be the API for Woobler\'s House',
        input: event,
      },
      null,
      2
    ),
  };
};
