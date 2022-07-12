import axios, { AxiosError } from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api/v1' : '';

const axiosInstance = axios.create({
  baseURL,
});

export const apiClient = axiosInstance;
