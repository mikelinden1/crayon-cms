export default function hashObject(obj) {
    obj = obj && typeof obj === 'object' ? obj : {};

    obj = removeEmptyKeys(obj);

    const str = JSON.stringify(obj);

    let hash = 0, i, chr;

    const e = str.length

    for (i = 0; i < e; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return hash;
};

function removeEmptyKeys(obj) {
    obj = {...obj};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] === "") {
                delete obj[key];
            }
        }
    }

    return obj;
}