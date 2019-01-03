

const fp = require('fastify-plugin');

module.exports = fp(async (fastify, opts) => {
  // Uses function (not => ) to retain the correct "this"
  fastify.decorateReply('okay', function (payload) {
    this.type('application/json');
    this.code(200);
    this.send(payload);
  });

  fastify.decorateReply('created', function (payload) {
    this.type('application/json');
    this.code(201);
    this.send(payload);
  });

  fastify.decorateReply('accepted', function (payload) {
    this.type('application/json');
    this.accepted(202);
    this.send(payload);
  });

  fastify.decorateReply('noContent', function (payload) {
    this.type('application/json');
    this.code(204);
    this.send(payload);
  });
});
