import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json'
    }
});

//aataches token to all outgoing requests
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
  },

  ArchiveNote: async (id, data) => {
    try {
      const response = await api.post(`/notes/${id}/archive`, data)
      return response.data
    } catch (error) {
      console.error("error posting note:", error)
    }
  }, 

  RestoreNote: async (id, data) => {
    try {
      const response = await api.post(`/notes/archived/${id}/restore`, data)
      return response.data
    } catch (error) {
      console.error("error posting note: ", error)
    }
  }
};

export const fetchServices = {
  fetchNotes: async() => {
    try {
      const response = await api.get("/notes")

      return response.data
    } catch (error) {
      throw new Error(error.message || "an error occurred");
    }
  },

  searchNotes: async (searchItem) => {
    try {
      const response = await api.get(`/notes?search=${encodeURIComponent(searchItem)}`)
      return response.data
    } catch (error) {
      throw new Error(error.message || "An error occurred")
    }
  },

  searchTags: async (tag) => {
    try {
      const response = await api.get(`/notes?tag=${encodeURIComponent(tag)}`)
      return response.data
    } catch (error) {
      throw new Error(error.message || "An error occurred")
    }
  },

  fetchArchivedNotes: async() => {

    try {

      const response = await api.get("/notes/archived")
      return response.data

    } catch (error) {
      throw new Error(error.message || "an error occurred");
    }
  },

  fetchNoteById: async(id) => {
    try {
      const response = await api.get(`/notes/${id}`)
      return response.data
    } catch (error) {
      throw new Error(error.message || "An error occurred")
    }
  },

  fetchArchivedNoteById: async(id) => {
    try {
      const response = await api.get(`/notes/archived/${id}`)
      return response.data
    } catch (error) {
      throw new Error(error.message || "An error occurred")
    }
  },

  updateFetchedNote: async(id, updatedNote) => {
    
    try {
      const response = await api.put(`/notes/${id}`, updatedNote)
      return response.data
    } catch (error) {
      throw new Error(error.message || "An error occurred")
    }
  },

  updateFetchedArchivedNote: async(id, updatedNote) => {
    
    try {
      const response = await api.put(`/notes/archived/${id}`, updatedNote)
      return response.data
    } catch (error) {
      throw new Error(error.message || "An error occurred")
    }
  },

  deleteNote: async(id) =>{
    try { 
      const response = await api.delete(`/notes/${id}`)
      return response.data
    } catch (error) {
      throw new Error(error.message || "An error occurred")
    }
  }

}


//sign up function
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

  //login function
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
  },

  //function to check if the token is valid with our backend
  verifyToken: async () => {
   
    const token = localStorage.getItem('token')
    if (!token) return false;

    try {
      await api.post('/verify-token');
      return true;
    } catch {
      localStorage.removeItem('token');
      return false;
    }   
  },

  requestPasswordReset: async (email) => {
    try {
      const response = await api.post("/forgot-password", {email})
      return response.data
    } catch(error) {
      if (error.response) {
        if (error.response.status === 404) {
          throw new Error("Email address not found")
        }
        throw new Error(error.response.data.error || "failed to send reset email")
      } else if (error.request) {
        throw new Error("Netwrok error - please check your connection");

      } else {
        throw new Error("Error reuesting password reset")
      }
    }
  },

  resetPassword: async ({ token, newPassword}) => {
    try {
      const response = await api.post("/password-reset", {
        token, 
        newPassword
  
      })
      return response.data
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          throw new Error("Invalid or expired reset token")
        }
        throw new Error(error.response.data.error || 'Failed to reset password') 
      } else if(error.request) {
        throw new Error("Network error - please check your connection")
      } else {
        throw new Error("Failed to reset password")
      }
    }
  }
} 