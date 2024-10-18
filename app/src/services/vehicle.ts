import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const vehicleForm = async (formData:any) => {
  try {
    const response = await axios.post(`${API_URL}/vehicles`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },    
      });

    return response; // This will contain the token and message
  } catch (error: any) {
    // Handle error as needed
    if (error.response) {
      throw new Error(error.response.data.message || 'vihicle data upload failed');
    }
    throw new Error('Login failed');
  }
};
