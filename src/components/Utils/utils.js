// This is a utility function that prepares the url endpoint for the the callApi function
export const prepareEndpoint = endpoint => {
  const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;
  const newEndpoint = `${BASE_URL}/${endpoint}`;
  return newEndpoint;
};

const unexpectedError =
  'There was an error processing your request. Please try later.';

// This checks the status of the request being made
export const checkStatus = response => {
  return new Promise((resolve, reject) => {
    if (response.status >= 200 && response.status < 300) {
      // 204 No Content means that we don't need to parse into JSON
      if (response.status === 204) return resolve({ success: true });

      return response.json().then(resolve);
    }
    if (response.status === 401) {
      throw new Error('Invalid token, please login again');
    }
    const error = new Error(response.statusText);

    return response
      .json()
      .then(json => {
        // Receive JSON information about the error from the server
        if (Array.isArray(json.error)) {
          error.message = json.error[0].msg || json.error[0].message;
        } else if (json.error && !Array.isArray(json.error)) {
          error.message = json.error;
        } else if (json.message) {
          error.message = json.message;
        } else {
          error.message = unexpectedError;
        }
      })
      .catch(() => {
        // Default error attributes, means server hasn't provided extra information
        error.message = unexpectedError;
      })
      .then(() => reject(error));
  });
};
