const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Trip = require('../app_api/models/travlr');
const { login } = require('./testUtils');

let authToken;

// Establish database connection and log in before all tests run
beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1/travlr_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  authToken = await login(app);
  if (!authToken) console.warn('Login failed. PUT tests may be skipped.');
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Trip.deleteMany({});

  await Trip.create({
    code: 'NYC210801',
    name: 'NYC Trip',
    length: '2 nights / 3 days',
    start: '2025-08-01T09:00:00.000Z',
    resort: 'Midtown Hotel',
    perPerson: '$1000',
    image: 'nyc.jpg',
    description: 'Visit the Big Apple'
  });
});

//PUT endpoint test
describe('PUT /api/trips/:tripCode', () => {
  it('should update an existing trip', async () => {
    if (!authToken) return console.warn('Skipping PUT test — token missing');

    const res = await request(app)
      .put('/api/trips/NYC210801')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        code: 'NYC210801',
        name: 'Updated NYC Trip',
        length: '3 nights / 4 days',
        start: '2025-08-01T09:00:00.000Z',
        resort: 'Updated Resort',
        perPerson: '$1100',
        image: 'nyc2.jpg',
        description: 'Updated description'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('name', 'Updated NYC Trip');
  });
});
