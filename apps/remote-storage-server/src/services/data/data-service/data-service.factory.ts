import { Injectable } from '@nestjs/common'
import { DataService } from '../data-service/data-service.interface'
import { RedisService } from '../redis/redis.service'
import { SqliteService } from '../sqlite/sqlite.service'
import * as process from 'process'

@Injectable()
export class DataServiceFactory {
  protected service: DataService

  constructor(private redisService: RedisService, private sqlLiteService: SqliteService) {
    if (process.env.DATA_STORE == 'sqlite') {
      this.service = sqlLiteService
    } else {
      this.service = redisService
    }
  }

  public getService(): DataService {
    return this.service
  }
}
