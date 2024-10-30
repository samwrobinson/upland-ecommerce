exports.handler = async (event) => {
  const path = encodeURIComponent(event.path);

  console.log("Redirecting to login with path:", path);  // Log the path being captured

  return {
    statusCode: 302,
    headers: {
      Location: `/login/?redirect=/collection/wholesale/`,  // Pass the captured path as a query parameter
    },
  };
};
