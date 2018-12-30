const serverless = require('sls-http-fastify');
// Require the framework
const Fastify = require('fastify');

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
  pluginTimeout: 10000,
});

// Register your application as a normal plugin.
app.register(require('./app.js'));

const handler = serverless(app);
module.exports.fastifyApi = async (event, context) => handler(event, context);
