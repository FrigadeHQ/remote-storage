import { API_ROOT, authenticatedGet, setupTestData } from './helpers/utils';

import * as request from 'supertest';

describe('App root', () => {
  beforeAll(async () => {
    await setupTestData();
  });

  it(`gets the root of the api without errors`, () => {
    return request(API_ROOT).get('/').trustLocalhost().expect(200);
  });

  it('returns the signed in user on /me', () => {
    return authenticatedGet('/v1/me').expect(200);
  });
});
