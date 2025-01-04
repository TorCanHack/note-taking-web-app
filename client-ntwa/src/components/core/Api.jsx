import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
});

// Export the services with proper error handling
export const postServices = {
  postNote: async (data) => {
      try {
          const response = await api.post("/notes", data);
          return response.data;
      } catch (error) {
          // Log the error details for debugging
          console.error('Error posting note:', error);
          
          // Provide more specific error messages based on the error type
          if (error.response) {
              throw new Error(error.response.data.error || 'Failed to create note');
          } else if (error.request) {
              throw new Error('Network error - please check your connection');
          } else {
              throw new Error('Error creating note');
          }
      }
  }
};

export const authServices = {
  signup: async(userData) => {
    try {
      const response = await api.post("/signup", userData)

      //if your api return a token upon signup
      if(response.data.token){
        localStorage.setItem("token", response.data.token)
      }

      return response.data
    } catch (error) {
      //log the error details for debugging
      console.error("Error during signup:", error)

      if(error.response) {
        //handle specific erroe cases based on status codes
        switch(error.response.status) {
          case 409:
            throw new Error("User already exists")
          case 400:
            throw new Error(error.response.data.error || "Invalid sign up date")
          default:
            throw new Error(error.response.data.error || "Failed to create account")
        }
      } else if(error.request){
          throw new Error("Network Error - please check your network connection")
      } else {
          throw new Error("An error occurred during signup")
      }
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post("/login", credentials);

      //store the token after succesful login
      localStorage.setItem("token", response.data.token);
      return response.data
    } catch(error){
      if(error.response) {
        //The server responded with a service code outside the 2xx range
        throw new Error(error.response.data.error || "Invalid credentials")

      } else if(error.request) {

        //the request has been made but no response was received
        throw new Error("Network error -please check your connection");
  
      } else {
        throw new Error("An error occurred during login")
      }
    } 

  },

  logout: () => {
    localStorage.removeItem('token')
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  }
} 