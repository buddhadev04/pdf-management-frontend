import axios from 'axios';

const API_BASE_URL = 'https://pdf-management-bkct.onrender.com';

export const uploadFile = async (file, category) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    console.log('Uploading file:', { file: file.name, category });

    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error.message, error.stack);
    let errorMessage = 'Upload failed';
    
    if (error.response) {
      errorMessage = error.response.data.error || `Server error (${error.response.status})`;
    } else if (error.request) {
      errorMessage = 'No response from server';
    } else {
      errorMessage = error.message;
    }
    
    throw new Error(errorMessage);
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchFiles = async (category) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/files/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};

export const verifyPdfAccess = async (pdfId, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify-pdf-access`, {
      pdfId,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying password:', error);
    throw error;
  }
};

export const checkApproval = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/check-approval/${token}`);
    return response.data;
  } catch (error) {
    console.error('Error checking approval:', error);
    throw error;
  }
};