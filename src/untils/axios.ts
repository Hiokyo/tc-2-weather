import Axios, { AxiosError, AxiosResponse } from 'axios';

const axiosInstance = Axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: 'https://discord.com/api/webhooks/1056935013733650432',
});

export const sendGet = (url: string, params?: object) => axiosInstance.get(url, { params }).then((res) => res.data);
export const sendPost = (url: string, params?: object, queryParams?: object) => axiosInstance.post(url, params, { params: queryParams }).then((res) => res.data);
export const sendPut = (url: string, params?: object) => axiosInstance.put(url, params).then((res) => res.data);
export const sendPatch = (url: string, params?: object) => axiosInstance.patch(url, params).then((res) => res.data);
export const sendDelete = (url: string, params?: object) => axiosInstance.delete(url, { params }).then((res) => res.data);
