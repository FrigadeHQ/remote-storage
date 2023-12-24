import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApiGuard } from '../../src/middlewares/api.guard';
import { FlowsModule } from '../../src/entities/flows.module';
import { mock_ForceGuardFail, mock_ForceGuardPass } from '../helpers/mocks';

describe('entities/', () => {
  let app: INestApplication;
  afterAll(async () => {
    await app.close();
  });
  describe('without appropriate headers', () => {
    beforeAll(async () => {
      const testModule: TestingModule = await Test.createTestingModule({
        imports: [FlowsModule],
      })
        .overrideGuard(ApiGuard)
        .useValue(mock_ForceGuardFail)
        .compile();

      app = testModule.createNestApplication();
      await app.init();
    });
    it('should return a 403', async () => {
      const res = await request(app.getHttpServer()).get('/v1/public/flows/');
      const expectedBody = {
        statusCode: 400,
        message: 'Bad request',
        error: 'Bad request',
      };
      expect(res.body).toEqual(expectedBody);
    });
  });
});
