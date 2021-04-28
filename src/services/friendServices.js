import axios from 'axios';

export default (function() {
  const url = '/api/v1/users/2/friends';
  
  const fetchAll = async () => {
    try {
      const res = await axios.get(url);
      return res;
    } catch (err) {
      return err.response; 
    }
  };

  return {
    fetchAll
  };
})();