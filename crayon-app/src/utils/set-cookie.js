export function setCookie(name, val, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    const expires = 'expires=' + d.toUTCString();

    const host = window.location.hostname;
    const domain = host === 'localhost' ? 'localhost' : host.indexOf('skift.com') !== -1 ? '.skift.com' : '.wpengine.com';

    document.cookie = name + '=' + val + ';' + expires + ';path=/;domain=' + domain;
};