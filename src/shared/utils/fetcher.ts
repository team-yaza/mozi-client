import axios from 'axios';
import { getCookie } from './cookie';

const apiClient = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api/v1' : 'https://mozi-server.com/api/v1',
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${getCookie('token')}`,
  },
});

const fetcher = async (method: 'get' | 'post' | 'patch' | 'delete', url: string, ...rest: object[]) => {
  try {
    const { data } = await apiClient[method](url, ...rest);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new Error('different error than axios');
  }
};

export default fetcher;
