const createProxyMiddleware = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/api/auth/*","/api/book/**","/api/static/img/books/*"], { target: "http://localhost:5000/" })
  );
};