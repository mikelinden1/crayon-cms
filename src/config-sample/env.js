const env = {
    localEnv: {
        siteUrl: 'http://localhost',
        apiBase: 'http://localhost/crayon-php-api',
        uploadPath: '../uploads',
        uploadFullPath: 'http://localhost/uploads'
    },
    prodEnv: {
        siteUrl: 'http://thesiteurl.com',
        apiBase: 'http://thesiteurl.com/crayon-php-api',
        uploadPath: '../uploads',
        uploadFullPath: 'http://thesiteurl.com/uploads'
    }
};

export default env;