export function setCookie(name, val, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    const expires = 'expires=' + d.toUTCString();

    document.cookie = name + '=' + val + ';' + expires + ';';
};