import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { EntitiesModule } from '../../src/entities/entities.module'
import { AppModule } from '../../src/app.module'

describe('entities/', () => {
  let app: INestApplication
  afterAll(async () => {
    await app.close()
  })
  describe('without appropriate headers', () => {
    beforeAll(async () => {
      const testModule: TestingModule = await Test.createTestingModule({
        imports: [EntitiesModule, AppModule],
      }).compile()

      app = testModule.createNestApplication()
      await app.init()
    })

    it('should return a 200 on root', async () => {
      const res = await request(app.getHttpServer()).get('/')
      expect(res.statusCode).toEqual(200)
    })
  })
})
