export function formatDate(date) {
    if (!date) {
        return '';
    }

    // need to re-order yyyy-MM-dd h:m:s to MM/dd/yyyy h:m:s for safari
    const dt = date.split(' ');
    date = dt[0];

    const c = date.split('-');

    let time = dt[1];
    const t = time.split(':');
    time = `${t[0]}:${t[1]}`;

    return `${c[1]}/${c[2]}/${c[0]} ${time}`;
}