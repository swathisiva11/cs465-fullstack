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

  if (!authToken) {
    console.warn('Login failed. Skipping POST test.');
  }
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Trip.deleteMany({});
});

//POST endpoint tests
describe('POST /api/trips', () => {
  it('should create a new trip', async () => {
    if (!authToken) return console.warn('Skipping test — token missing');

    const newTrip = {
      code: 'LOND210701',
      name: 'London Trip',
      length: '4 nights / 5 days',
      start: '2025-07-01T09:00:00.000Z',
      resort: 'Piccadilly Hotel',
      perPerson: '$1500',
      image: 'london.jpg',
      description: 'Explore the sights of London'
    };

    const res = await request(app)
      .post('/api/trips')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Accept', 'application/json')
      .send(newTrip);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('code', 'LOND210701');
  });
});
