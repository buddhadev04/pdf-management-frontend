import axios from 'axios';

const API_BASE_URL = 'https://pdf-management-bkct.onrender.com';

export const verifyPdfAccess = async (pdfId, password) => {
  try {
    if (!pdfId || !password) {
      console.error('Missing pdfId or password:', { pdfId, password });
      throw new Error('pdfId and password are required');
    }

    console.log('Sending verifyPdfAccess request:', { pdfId, password });
    const response = await axios.post(`${API_BASE_URL}/verify-pdf-access`, {
      pdfId,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('verifyPdfAccess response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error verifying password:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      stack: error.stack,
    });
    let errorMessage = 'Failed to verify access';
    if (error.response) {
      errorMessage = error.response.data.error || `Server error (${error.response.status})`;
    } else if (error.request) {
      errorMessage = 'No response from server. Please check your network or server status.';
    }
    throw new Error(errorMessage);
  }
};