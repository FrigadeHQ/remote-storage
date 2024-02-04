import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { SqliteService } from '../../src/services/data/sqlite/sqlite.service'
import { DataServiceModule } from '../../src/services/data/data-service/data-service.module'
import { SqliteModule } from '../../src/services/data/sqlite/sqlite.module'
import { AppModule } from '../../src/app.module'

describe('SqliteService', () => {
  let app: INestApplication
  let sqliteService: SqliteService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DataServiceModule, SqliteModule, AppModule],
    }).compile()

    app = module.createNestApplication()
    sqliteService = module.get<SqliteService>(SqliteService)

    jest.spyOn(sqliteService, 'get').mockImplementation(async (key: string) => {
      if (key === 'key') {
        return { key: 'value' }
      }
      return null
    })
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should retrieve null for a non-existent key', async () => {
    await expect(sqliteService.get('exampleKey')).resolves.toBeNull()
  })
})
