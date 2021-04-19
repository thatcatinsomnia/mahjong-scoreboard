import axios from 'axios';

export default (function() {
  const url = '/api/v1/hands';
  
  const fetchAll = async () => {
    const res = await axios.get(url);

    return res
  };

  return {
    fetchAll
  };
})();