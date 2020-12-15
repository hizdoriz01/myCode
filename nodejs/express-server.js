process.env.NODE_ENV = 'development';
const express = require('./config/express')
const logger = require('./logger');
const { PORT } = process.env;

express.listen(PORT, () => {
    console.log(`Start server at port ${PORT}.`)
})

express.on('listening', () => {
    const addr = express.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
});

express.on('error', () => {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;
  
    switch (error.code) {
      case 'EACCES':
        logger.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        logger.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });