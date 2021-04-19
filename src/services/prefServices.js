import axios from 'axios';

export default (function() {
  const url = '/api/v1/users/2/preferences';
  
  const fetchAll = async () => {
    const res = await axios.get(url);
    return res
  };

  const fetchById = async id => {
    const res = await axios.get(`${url}/${id}`);
    return res
  };

  const create = async pref => {
    const res = await axios.post(url, pref);
    return res;
  }

  const patchById = async (id, pref) => {
    const res = await axios.patch(`${url}/${id}`, pref);
    return res;
  };

  return {
    fetchAll,
    fetchById,
    create,
    patchById
  };
})();