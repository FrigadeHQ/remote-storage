import { Module } from '@nestjs/common'
import { DataServiceFactory } from './data-service.factory'
import { RedisModule } from '../redis/redis.module'
import { SqliteModule } from '../sqlite/sqlite.module'

@Module({
  imports: [RedisModule, SqliteModule],
  providers: [DataServiceFactory, RedisModule, SqliteModule],
  exports: [DataServiceFactory],
})
export class DataServiceModule {}
