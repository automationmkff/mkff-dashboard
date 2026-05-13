const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyyhuuN7RvUGOIo1OdMLlY5tJsHfH7Ikx7i_cwaQDI_3G6njuSTpOvrbUYN659c1-1I/exec';

exports.handler = async function(event, context) {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(APPS_SCRIPT_URL, {
      redirect: 'follow',
      headers: { 'Accept': 'application/json' }
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
