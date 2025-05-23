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
    useUnifiedTopology: true,
  });

  authToken = await login(app);
  if (!authToken) console.warn('⚠️ Login failed. Some tests may be skipped.');
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Trip.deleteMany({});
});

//GET endpoint test
describe('GET /api/trips', () => {
  it('should return an array of trips', async () => {
    await Trip.create({
      code: 'CLAR210621',
      name: 'Clarion Trip',
      length: '3 nights / 4 days',
      start: new Date('2025-06-21T08:00:00.000Z'),
      resort: 'Clarion Resort',
      perPerson: '$800',
      image: 'clarion.jpg',
      description: 'Relaxing getaway to Clarion',
    });

    const res = await request(app).get('/api/trips');

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toHaveProperty('code', 'CLAR210621');
  });
});

describe('POST /api/trips', () => {
  it('should create a new trip', async () => {
    if (!authToken) return console.warn('⏩ Skipping POST test — token missing');

    const newTrip = {
      code: 'MIAM210625',
      name: 'Miami Trip',
      length: '5 nights / 6 days',
      start: '2025-06-21T08:00:00.000Z',
      resort: 'South Beach',
      perPerson: '$1200',
      image: 'reef3.jpg',
      description: 'A sunny escape to Miami',
    };

    const res = await request(app)
      .post('/api/trips')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Accept', 'application/json')
      .send(newTrip);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.code).toBe('MIAM210625');
  });
});

describe('GET /api/trips/:tripCode', () => {
  it('should return a trip by code', async () => {
    await Trip.create({
      code: 'CLAR210621',
      name: 'Clarion Trip',
      length: '3 nights / 4 days',
      start: new Date('2025-06-21T08:00:00.000Z'),
      resort: 'Clarion Resort',
      perPerson: '$800',
      image: 'clarion.jpg',
      description: 'Relaxing getaway to Clarion',
    });

    const res = await request(app).get('/api/trips/CLAR210621');

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('code', 'CLAR210621');
  });
});
