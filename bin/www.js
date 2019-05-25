var app = require('../app');
var debug = require('debug')('view-test112:server');
var http = require('http');

const port = normalizePort(process.env.PORT || '3000');

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    //return false;
    return new Error('Invalid port value');
}
