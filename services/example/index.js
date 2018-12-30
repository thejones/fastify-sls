

module.exports = async function (fastify, opts) {
  fastify.get('/example', async (request, reply) => ({
    hugs: fastify.someSupport(), // uses decorator
    token: process.env.SECRET_ACCESS_TOKEN,
  }));
};
