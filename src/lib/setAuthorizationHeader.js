import axios from 'axios';

export default function() {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    delete axios.defaults.headers.Authorization;
  }
}