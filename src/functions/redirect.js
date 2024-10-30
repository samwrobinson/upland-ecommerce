exports.handler = async (event) => {
  const path = encodeURIComponent(event.path);  // Capture and encode the requested path

  return {
    statusCode: 302,
    headers: {
      Location: `/login/?redirect=${path}`,  // Redirect to login with the original path as a query string
    },
  };
};
