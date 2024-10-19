import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://testdsol.vercel.app/api';

export const vehicleForm = async (formData:any) => {
  try {
    const response = await axios.post(`${API_URL}/vehicles`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },    
      });

    return response; 
  } catch (error: any) {
    // Handle error as needed
    if (error.response) {
      throw new Error(error.response.data.message || 'vihicle data upload failed');
    }
    throw new Error('Login failed');
  }
};
