import { Module } from '@nestjs/common'
import { EntitiesService } from './entities.service'
import { EntitiesController } from './entities.controller'
import { RedisModule } from '../services/redis/redis.module'

@Module({
  imports: [RedisModule],
  controllers: [EntitiesController],
  providers: [EntitiesService],
  exports: [EntitiesService],
})
export class EntitiesModule {}
