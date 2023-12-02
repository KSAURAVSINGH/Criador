const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://express-api:3001',  // Docker service name
      changeOrigin: true,
    })
  );
};