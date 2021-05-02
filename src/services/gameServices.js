import axios from 'axios';

export default (function() {
  const url = '/api/v1/users/2/game-records';
  
  const fetchAll = async (params = null) => {
    try {
      const res = await axios.get(url, { params });
      return res;
    } catch (err) {
      return err.response; 
    }
  };

  const create = async gameRecord => {
    try {
      const res = await axios.post(url, gameRecord);
      return res;
    } catch (err) {
      return err.response; 
    }
  };

  return {
    fetchAll,
    create
  };
})();