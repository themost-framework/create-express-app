/* eslint-env node */
import debug from 'debug';
import http from 'http';
const log = debug('app:log');
const error = debug('app:error');
/**
 * @param {Express.Application} app 
 */
function startApplication(app) {
    /**
 * Get port from environment and store in Express.
 */
    let port = normalizePort(process.env.PORT || '3000');
    app.set('port', port);

    /**
     * Create HTTP server.
     */
    let server = http.createServer(app);
    /**
     * Get ip from environment and store in Express.
     */
    let ip = process.env.IP || 'localhost';
    app.set('ip', ip);
    /**
     * Listen on provided port.
     */
    server.listen(port, ip);
    server.on('error', onError);
    server.on('listening', onListening);

    /**
     * Normalize a port into a number, string, or false.
     */
    function normalizePort(val) {
        let port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }
    /**
     * Event listener for HTTP server "error" event.
     */

    function onError(err) {
        if (err.syscall !== 'listen') {
            throw err;
        }

        let bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (err.code) {
            case 'EACCES':
                // eslint-disable-next-line no-console
                error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                // eslint-disable-next-line no-console
                error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw err;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */

    function onListening() {
        let addr = server.address();
        let bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        log('Listening on ' + bind);
    }
}

export {
    startApplication
}