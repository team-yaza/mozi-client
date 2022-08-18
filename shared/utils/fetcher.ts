import axios from 'axios';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? 'https://mozi-server.com/api/v1' : 'http://localhost:3001/api/v1';

const fetcher = async (method: 'get' | 'post' | 'patch' | 'delete', url: string, ...rest: object[]) => {
  try {
    const { data } = await axios[method](url, ...rest);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }

    throw new Error('different error than axios');
  }
};

export default fetcher;
