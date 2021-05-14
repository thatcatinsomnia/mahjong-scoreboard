import axios from 'axios';

export default (function() {
  const url = '/api/v1/friends';
  
  const fetchAll = async () => {
    try {
      const res = await axios.get(url);
      return res;
    } catch (error) {
      return error.response; 
    }
  };

  return {
    fetchAll
  };
})();