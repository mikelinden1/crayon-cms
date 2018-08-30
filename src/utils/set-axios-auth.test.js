import axios from 'axios';
import { setAxiosAuth } from './set-axios-auth';

it('Axios Authorization header is set correctly', () => {
    const token = 'thetoken';

    setAxiosAuth(token);

    expect(axios.defaults.headers.common['Authorization']).toEqual(`Bearer ${token}`);
});