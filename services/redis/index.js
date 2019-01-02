

module.exports = async function (fastify, opts) {
  fastify.get('/redis', (req, reply) => {
    const { redis } = fastify;
    redis.get(req.query.key, (err, val) => {
      reply.send(err || val);
    });
  });

  fastify.post('/redis', (req, reply) => {
    const { redis } = fastify;
    redis.set(req.body.key, req.body.value, (err) => {
      reply.send(err || { status: 'ok' });
    });
  });
};
