import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EntitiesModule } from './entities/entities.module'

@Module({
  imports: [EntitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
