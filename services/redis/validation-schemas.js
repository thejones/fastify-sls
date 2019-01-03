const getSchema = {
  querystring: {
    type: 'object',
    properties: {
      key: { type: 'string' },
    },
    required: ['key'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        key: { type: 'string' },
      },
    },
  },

};


const postSchema = {
  body: {
    type: 'object',
    properties: {
      key: { type: 'string' },
      value: { type: 'string' },
    },
    required: ['key', 'value'],
  },
  response: {
    200: {
      type: 'string',
    },
  },

};

module.exports = {
  getSchema,
  postSchema,
};
