import axios from 'axios';

export default function() {
  if (localStorage.jwt) {
    axios.defaults.headers.Authorization = `Bearer ${localStorage.jwt}`;
  } else {
    delete axios.defaults.headers.Authorization;
  }
}