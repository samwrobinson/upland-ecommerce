const querystring = require('querystring');
const axios = require('axios');

exports.handler = async function (event) {
  const { password } = querystring.parse(event.body);  // Extract the password from the form submission
  const { redirect } = querystring.parse(event.headers.referer.split('?')[1]);  // Extract the redirect path from the query string

  const endpoint = `${process.env.URL}/.netlify/identity/token`;  // Identity endpoint

  const data = querystring.stringify({
    grant_type: 'password',
    username: 'sam@eskerdesigns.com',  // Replace with your Identity user email
    password: password,
  });
  const options = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const response = await axios.post(endpoint, data, options);
    const access_token = response.data.access_token;

    // Set the JWT token as a cookie and redirect to the original path (or a default path if not provided)
    return {
      statusCode: 302,
      headers: {
        'Set-Cookie': `nf_jwt=${access_token}; Path=/; HttpOnly; Secure`,
        'Cache-Control': 'no-cache',
        Location: redirect || '/collection/wholesale/',  // Redirect after successful login
      },
    };
  } catch (error) {
    console.error("Error during login:", error);

    // On error, return to login with the redirect query parameter still intact
    return {
      statusCode: 302,
      headers: {
        'Cache-Control': 'no-cache',
        Location: `/login/?redirect=${encodeURIComponent(redirect)}`,
      },
    };
  }
};
