'use strict';

module.exports.auth = (event, context, callback) => {

  getKeys((err, res) => {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },  
      body: JSON.stringify({
        message: 'test'
      }),
    };

    callback(err, response);
  })
};

const getKeys = (callback) => {
  callback();
};
