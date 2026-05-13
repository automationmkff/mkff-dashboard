const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyyhuuN7RvUGOIo1OdMLlY5tJsHfH7Ikx7i_cwaQDI_3G6njuSTpOvrbUYN659c1-1I/exec';

exports.handler = async function(event, context) {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(APPS_SCRIPT_URL, {
      redirect: 'follow',
      headers: { 'Accept': 'application/json' }const https = require('https');

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyyhuuN7RvUGOIo1OdMLlY5tJsHfH7Ikx7i_cwaQDI_3G6njuSTpOvrbUYN659c1-1I/exec';

function httpsGet(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 10) return reject(new Error('Too many redirects'));
    https.get(url, { headers: { 'Accept': 'application/json' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(httpsGet(res.headers.location, redirectCount + 1));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

exports.handler = async function(event, context) {
  try {
    const result = await httpsGet(APPS_SCRIPT_URL);
    if (result.status !== 200) {
      throw new Error(`Apps Script returned ${result.status}: ${result.body}`);
    }
    const data = JSON.parse(result.body);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message })
    };
  }
};


    });const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyyhuuN7RvUGOIo1OdMLlY5tJsHfH7Ikx7i_cwaQDI_3G6njuSTpOvrbUYN659c1-1I/exec';

exports.handler = async function(event, context) {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      redirect: 'follow',
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Apps Script returned ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message })
    };
  }
};


    if (!response.ok) {
      throw new Error(`Apps Script returned ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message })
    };
  }
};
