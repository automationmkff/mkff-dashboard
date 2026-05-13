var https = require('https');

var APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyyhuuN7RvUGOIo1OdMLlY5tJsHfH7Ikx7i_cwaQDI_3G6njuSTpOvrbUYN659c1-1I/exec';
var FX_URL = 'https://api.frankfurter.app/latest?from=USD&to=THB';

function httpsGet(url, redirectCount) {
  redirectCount = redirectCount || 0;
  return new Promise(function(resolve, reject) {
    if (redirectCount > 10) return reject(new Error('Too many redirects'));
    https.get(url, { headers: { 'Accept': 'application/json' } }, function(res) {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(httpsGet(res.headers.location, redirectCount + 1));
      }
      var data = '';
      res.on('data', function(chunk) { data += chunk; });
      res.on('end', function() { resolve({ status: res.statusCode, body: data }); });
    }).on('error', reject);
  });
}

exports.handler = function(event, context) {
  var params = event.queryStringParameters || {};

  // FX rate endpoint
  if (params.type === 'fx') {
    return httpsGet(FX_URL).then(function(result) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: result.body
      };
    }).catch(function(error) {
      return {
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: error.message })
      };
    });
  }

  // Google Sheets endpoint (default)
  return httpsGet(APPS_SCRIPT_URL).then(function(result) {
    if (result.status !== 200) {
      throw new Error('Apps Script returned ' + result.status + ': ' + result.body);
    }
    var data = JSON.parse(result.body);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  }).catch(function(error) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message })
    };
  });
};
