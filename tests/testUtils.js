// testUtils.js
const login = async (app) => {
  const res = await require('supertest')(app)
    .post('/api/login')
    .send({
      name: 'Joe Smith',
      email: 'jsmith9867@example.com',
      password: 'SomeSpecialMagicString!'
    });
  return res.body.token;
};

module.exports = { login };
