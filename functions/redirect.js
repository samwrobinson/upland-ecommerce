exports.handler = async (event) => {
    const path = encodeURIComponent(event.path);

// Add this
const { redirect } = querystring.parse(event.headers.referer.split('?')[1]);

  // Change this in the try statement
  return {
    statusCode: 302,
    headers: {
      'Set-Cookie': `nf_jwt=${access_token}; Path=/; HttpOnly; Secure`,
      'Cache-Control': 'no-cache',
      Location: redirect || '/pro/',
    },
  };
    
};

// And this in the catch statement
return {
  statusCode: 302,
  headers: {
    'Cache-Control': 'no-cache',
    Location: `/login/?redirect=${encodeURIComponent(redirect)}`,
  },
};