import { Module } from '@nestjs/common'
import { EntitiesService } from './entities.service'
import { EntitiesController } from './entities.controller'
import { DataServiceModule } from '../services/data/data-service/data-service.module'
import { DataServiceFactory } from '../services/data/data-service/data-service.factory'
import { SqliteModule } from '../services/data/sqlite/sqlite.module'
import { RedisModule } from '../services/data/redis/redis.module'

@Module({
  imports: [DataServiceModule, SqliteModule, RedisModule],
  controllers: [EntitiesController],
  providers: [EntitiesService, DataServiceFactory],
  exports: [EntitiesService],
})
export class EntitiesModule {}
