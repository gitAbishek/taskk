import axios, { AxiosResponse } from 'axios';
import { parseApiError } from '../helper/error';
import {  BASE_URL } from '../constant/common';

axios.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject(error),
);

interface ApiRequestParams {
  url: string;
  params?: Record<string, any>;
  body?: any;
  header?: object;
  contentType?: string;
}

const get = async ({ url, params }: ApiRequestParams) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const requestParams = {
    ...params,
  };

  const fullUrl = `${BASE_URL}/${url}`;

  return axios
    .get(fullUrl, {
      headers,
      params: requestParams,
    })
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error) => {
      const errorMessage = parseApiError(error);
      throw Error(errorMessage);
    });
};

const post = async ({
  url,
  body,
  header,
  contentType = 'application/json',
}: ApiRequestParams) => {
  const fullUrl = `${BASE_URL}/${url}`;

  const headers = {
    Accept: 'application/json',
    'Content-Type': contentType,
    ...header
  };

  return axios
    .post(fullUrl, body, { headers })
    .then((response: AxiosResponse) => response.data)
    .catch((error) => {
      throw Error(parseApiError(error));
    });
};






export { get, post };
