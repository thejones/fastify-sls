const path = require('path');
const AutoLoad = require('fastify-autoload');
// const proxy = require('fastify-http-proxy');
const helmet = require('fastify-helmet');
const rateLimit = require('fastify-rate-limit');
const redis = require('fastify-redis');
const sensible = require('fastify-sensible');
const swagger = require('fastify-swagger');

module.exports = (fastify, opts, next) => {
  // Place your custom code here!
  // Register plugins from the Ecosystem
  fastify.register(
    helmet,
    // Example of passing an option to x-powered-by middleware
    { hidePoweredBy: { setTo: 'PHP 4.2.0' } },
  );


  fastify.register(sensible);
  fastify.register(redis, { host: process.env.REDIS_URL });

  fastify.register(rateLimit, {
    max: 10,
    timeWindow: '1 minute',
  });

  // fastify.register(proxy, {
  //   upstream: process.env.INNER_API_BASE_URL,
  //   prefix: '/inner',
  //   rejectUnauthorized: false,
  // });


  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in services
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: Object.assign({}, opts),
  });


  fastify.ready((err) => {
    if (err) throw err;

    fastify.swagger();
    console.log(fastify.printRoutes());
  });

  // Make sure to call next when done
  next();
};
