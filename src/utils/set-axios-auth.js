import axios from 'axios';

export function setAxiosAuth(jwt) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
};