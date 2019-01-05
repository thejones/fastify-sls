const fp = require('fastify-plugin');
const rp = require('request-promise');
// const isPast = require('date-fns/is_past');

const options = {
  method: 'POST',
  uri: `${process.env.INNER_API_BASE_URL}/token`,
  form: {
    username: process.env.INNER_USERNAME,
    password: process.env.INNER_PASSWORD,
    grant_type: 'password',
  },

  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded', // handled automatically
    'Cache-Control': 'no-cache',
  },
  json: true, // Automatically stringifies the body to JSON
};

module.exports = fp(async (fastify, opts) => {
  fastify.decorateRequest('setInnerAPIHeaders', async function () {
    const body = await rp(options);
    this.headers.Authorization = `${body.token_type} ${body.access_token}`;
  });
});
