import { useCallback } from 'react';
import { checkStatus, prepareEndpoint } from '../Utils/utils';

export const useQueryAPI = () => {
  const callApi = async (endpoint, options) => {
    // let rawResponse: Response | undefined = undefined;
    try {
      const response = await fetch(prepareEndpoint(endpoint), {
        ...options,
      });
      const data = await checkStatus(response);
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  };
  return useCallback(callApi, []);
};
