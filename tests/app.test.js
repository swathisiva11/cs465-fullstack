const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('GET /', () => {
  afterAll(async () => {
    await mongoose.connection.close(); // 
  });

  it('should return 200 OK', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});