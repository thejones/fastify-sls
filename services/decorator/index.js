

module.exports = async function (fastify, opts) {
  fastify.get('/decorator', async (request, reply) => ({
    hugs: fastify.someSupport(), // uses decorator
    token: process.env.SECRET_ACCESS_TOKEN,
  }));
};
