import axios from 'axios';

export default (function() {
  const url = '/api/v1/users/2/preferences';
  
  const fetchAll = async () => {
    try {
      const res = await axios.get(url);
      return res;
    } catch (error) {
      return error.response;
    }
  };

  const fetchById = async id => {
    try {
      const res = await axios.get(`${url}/${id}`);
      return res
    } catch (error) {
      return error.response;
    }
  };

  const create = async pref => {
    try {
      const res = await axios.post(url, pref);
      return res;
    } catch (error) {
      return error.response;
    }
  }

  const patchById = async (id, pref) => {
    try {
      const res = await axios.patch(`${url}/${id}`, pref);
      return res;
    } catch (error) {
      return error.response;
    }
  };

  const deleteById = async id => {
    try {
      const res = await axios.delete(`${url}/${id}`);
      return res;
    } catch (error) {
      return error.response;
    }
  };

  return {
    fetchAll,
    fetchById,
    create,
    patchById,
    deleteById
  };
})();