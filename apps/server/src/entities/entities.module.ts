import { Module } from '@nestjs/common'
import { EntitiesService } from './entities.service'
import { EntitiesController } from './entities.controller'

@Module({
  imports: [],
  controllers: [EntitiesController],
  providers: [EntitiesService],
  exports: [EntitiesService],
})
export class EntitiesModule {}
