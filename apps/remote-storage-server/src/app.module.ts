import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EntitiesModule } from './entities/entities.module'
import { RedisModule } from './services/redis/redis.module'

@Module({
  imports: [EntitiesModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
