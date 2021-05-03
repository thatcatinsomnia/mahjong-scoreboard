import axios from 'axios';

export default (function() {
  const url = '/api/v1/users/2/game-records';
  
  const fetchAll = async (params = null) => {
    try {
      const res = await axios.get(url, { params });
      return res;
    } catch (error) {
      return error.response; 
    }
  };

  const fetchById = async id => {
    try {
      const res = await axios.get(`${url}/${id}`);
      return res;
    } catch (error) {
      return error.response; 
    }
  };

  const create = async gameRecord => {
    try {
      const res = await axios.post(url, gameRecord);
      return res;
    } catch (error) {
      return error.response; 
    }
  };

  const update = async (id, gameRecord) => {
    try {
      const res = await axios.patch(`${url}/${id}`, gameRecord);
      return res;
    } catch (error) {
      
    }
  }


  return {
    fetchAll,
    fetchById,
    create,
    update
  };
})();