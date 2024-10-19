import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://testdsol.vercel.app/api';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data; // This will contain the token and message
  } catch (error: any) {
    // Handle error as needed
    if (error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error('Login failed');
  }
};
