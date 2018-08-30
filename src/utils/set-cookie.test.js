import { setCookie } from './set-cookie';
import { getCookie } from './get-cookie';

it('setCookie works', () => {
    const cookieName = 'test cookie';
    const cookieVal = 'testing 1... 2... 3...';

    setCookie(cookieName, cookieVal, 1);
    
    const cookie = getCookie(cookieName);
    expect(cookie).toEqual(cookieVal);
});