import axios from 'axios';

export default (function() {
  const loginUrl = '/api/v1/login';
  const registerUrl = '/api/v1/register';
  
  const login = async (payload) => {
    try {
      const res = await axios.post(loginUrl, payload);
      return res;
    } catch (error) {
      return error.response; 
    }
  };

  return {
    login
  };
})();