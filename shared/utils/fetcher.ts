import axios from 'axios';
import { getSession } from 'next-auth/react';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api/v1' : 'https://mozi-server.com/api/v1',
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();

  console.log('여긴 뭐임?');

  if (config.headers) {
    config.headers.Authorization = `Bearer ${session?.accessToken}`;
  }

  return config;
});

const fetcher = async (method: 'get' | 'post' | 'patch' | 'delete', url: string, ...rest: object[]) => {
  try {
    const { data } = await api[method](url, ...rest);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new Error('different error than axios');
  }
};

export default fetcher;
