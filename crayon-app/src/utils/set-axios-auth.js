import axios from 'axios';

export function setAxiosAuth(jwt) {
    console.log('jwt', jwt);
    axios.defaults.headers.common['Authorization'] = jwt;
};