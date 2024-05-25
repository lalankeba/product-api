const logger = require('../logger/logger');

const requestLogger = (req, res, next) => {
    let ipAddress = getIpAddress(req);
    logger.info(`From: ${ipAddress} ${req.method} ${req.url}`);
    next();
}

const getIpAddress = (req) => {
  let ipAddress = req.ip;

    if (req.headers['x-forwarded-for']) {
      ipAddress = req.headers['x-forwarded-for'].split(',').shift();
    } else if (req.connection && req.connection.remoteAddress) {
      ipAddress = req.connection.remoteAddress;
    } else if (req.socket && req.socket.remoteAddress) {
      ipAddress = req.socket.remoteAddress;
    } else if (req.connection && req.connection.socket && req.connection.socket.remoteAddress) {
      ipAddress = req.connection.socket.remoteAddress;
    }
    // Handle IPv6-mapped IPv4 addresses
    if (ipAddress.startsWith('::ffff:')) {
        ipAddress = ipAddress.split('::ffff:')[1];
    }
    return ipAddress;
}

module.exports = requestLogger;