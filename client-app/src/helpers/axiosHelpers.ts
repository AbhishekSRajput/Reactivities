import axios from 'axios';

const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    // You can handle the error here or rethrow it to be handled elsewhere
    throw error;
  }
};

const postData = async (url: string, data: any) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer your-access-token',
  },
});

// Usage:
const fetchData2 = async () => {
  try {
    const response = await axiosInstance.get('/data');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


// Request interceptor
axios.interceptors.request.use(
  (config) => {
    // Modify the request config before sending the request
    console.log('Request:', config);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    // Modify the response data before resolving the promise
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response interceptor error:', error);
    return Promise.reject(error);
  }
);

// Usage:
axios.get('/data').then((response) => {
  // Handle the response
}).catch((error) => {
  // Handle the error
});
