const { getSchema, postSchema } = require('./validation-schemas');

module.exports = async function (fastify, opts) {
  // routes
  fastify.get('/redis', { schema: getSchema }, async (req, reply) => {
    const { redis } = fastify;
    const expectedReturn = await redis.get(req.query.key);
    reply.okay({ key: expectedReturn });
  });

  fastify.post('/redis', { schema: postSchema }, async (req, reply) => {
    const { redis } = fastify;
    await redis.set(req.body.key, req.body.value);
    reply.okay();
  });
};
